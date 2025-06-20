using Microsoft.Extensions.Options;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Taskify.Contracts;
using Taskify.Contracts.IService;

public class GeminiService : IGeminiService
{
    private readonly HttpClient _httpClient;
    private readonly GeminiConfig _config;
    private static readonly JsonSerializerOptions _jsonOptions = new(JsonSerializerDefaults.Web);

    public GeminiService(HttpClient httpClient, IOptions<GeminiConfig> config)
    {
        _httpClient = httpClient;
        _httpClient.Timeout = TimeSpan.FromSeconds(220); 
        _config = config.Value;
    }

    public async Task<string> CheakTopicAsync(string userInput)
    {
        var requestBody = new
        {
            contents = new[]
            {
                new
                {
                    parts = new[]
                    {
                        new { text = GeminiPrompts.ValidateTopic },
                        new { text = userInput }
                    }
                }
            }
        };

        var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={_config.Key}";
        var content = new StringContent(JsonSerializer.Serialize(requestBody, _jsonOptions), Encoding.UTF8, "application/json");

        using var response = await _httpClient.PostAsync(url, content);
        response.EnsureSuccessStatusCode();

        await using var stream = await response.Content.ReadAsStreamAsync();
        using var doc = await JsonDocument.ParseAsync(stream);

        if (doc.RootElement.TryGetProperty("candidates", out var candidates) &&
            candidates.GetArrayLength() > 0 &&
            candidates[0].TryGetProperty("content", out var contentElement) &&
            contentElement.TryGetProperty("parts", out var parts) &&
            parts.GetArrayLength() > 0 &&
            parts[0].TryGetProperty("text", out var textElement))
        {
            return textElement.GetString()?.Trim() ?? "unknown";
        }

        return "unknown";
    }

    public async Task<string> Generate(string courseTitle)
    {
        var requestBody = new
        {
            model = "deepseek/deepseek-r1:free",
            messages = new[] { new { role = "user", content = GeminiPrompts.GetCoursePlanPrompt(courseTitle) } }
        };

        var request = new HttpRequestMessage(HttpMethod.Post, "https://openrouter.ai/api/v1/chat/completions")
        {
            Content = new StringContent(JsonSerializer.Serialize(requestBody, _jsonOptions), Encoding.UTF8, "application/json")
        };

        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _config.Key);
        request.Headers.Add("HTTP-Referer", "https://your-site-url.com");
        request.Headers.Add("X-Title", "ZenithStore AI Course Builder");

        using var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync(); // NOTE: you were returning `requestJson`, not the response
    }

    public async Task<string> GenerateCoursePlanAsync(string courseTitle)
    {
        var requestBody = new
        {
            model = "deepseek/deepseek-chat:free",
            messages = new[] { new { role = "user", content = GeminiPrompts.GetCoursePlanPrompt(courseTitle) } }
        };

        var content = new StringContent(JsonSerializer.Serialize(requestBody, _jsonOptions), Encoding.UTF8, "application/json");

        var request = new HttpRequestMessage(HttpMethod.Post, "https://openrouter.ai/api/v1/chat/completions")
        {
            Content = content
        };

        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _config.Key);
        request.Headers.Add("HTTP-Referer", "https://your-site-url.com");
        request.Headers.Add("X-Title", "ZenithStore AI Course Builder");

        using var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        await using var stream = await response.Content.ReadAsStreamAsync();
        using var doc = await JsonDocument.ParseAsync(stream);

        var markdownText = doc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();

        return ExtractJsonFromMarkdown(markdownText ?? string.Empty);
    }

    /// <summary>
    /// Extracts first valid JSON object from markdown/text blob.
    /// Assumes JSON starts at first `{` and ends at matching `}`.
    /// </summary>
    private string ExtractJsonFromMarkdown(string input)
    {
        int start = input.IndexOf('{');
        if (start == -1) return "{}";

        int openBraces = 0;
        for (int i = start; i < input.Length; i++)
        {
            if (input[i] == '{') openBraces++;
            else if (input[i] == '}') openBraces--;

            if (openBraces == 0)
                return input[start..(i + 1)];
        }

        return "{}"; 
    }
}
