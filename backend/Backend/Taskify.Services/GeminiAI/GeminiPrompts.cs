using System;
using System.Text.Json;
using System.Text.RegularExpressions;

public class GeminiPrompts
{
    public static string GetCoursePlanPrompt(string courseTitle)
    {
        return $@"
{{
  ""courseTitle"": ""{courseTitle}"",
  ""targetAudience"": """",
  ""prerequisites"": [
    {{
      ""category"": """",
      ""items"": []
    }}
  ],
  ""learningRoadmap"": {{
    ""beginnerLevel"": {{
      ""objective"": """",
      ""module"": [
        {{
          ""level"": ""beginner"",
          ""order"": 1,
          ""title"": """",
          ""topic"": [],
          ""lesson"": [
            {{
              ""title"": ""Lesson title (specific skill/concept)"",
              ""content"": ""Detailed explanation of what will be taught""
            }}
          ],
          ""problemPractice"": [],
          ""recommendedResource"": [
            {{
              ""title"": """",
              ""type"": """",
              ""link"": """"
            }}
          ],
          ""learningTip"": [],
          ""outcomes"": [],
          ""assessment"": """",
          ""nextModuleHint"": """",
          ""dependency"": []
        }}
      ]
    }},
    ""intermediateLevel"": {{
      ""objective"": """",
      ""module"": [
        {{
          ""level"": ""intermediate"",
          ""order"": 1,
          ""title"": """",
          ""topic"": [],
          ""lesson"": [
            {{
              ""title"": ""Lesson title (specific skill/concept)"",
              ""content"": ""Detailed explanation of what will be taught""
            }}
          ],
          ""problemPractice"": [],
          ""recommendedResource"": [
            {{
              ""title"": """",
              ""type"": """",
              ""link"": """"
            }}
          ],
          ""learningTip"": [],
          ""outcomes"": [],
          ""assessment"": """",
          ""nextModuleHint"": """",
          ""dependency"": []
        }}
      ]
    }},
    ""advancedLevel"": {{
      ""objective"": """",
      ""module"": [
        {{
          ""level"": ""advanced"",
          ""order"": 1,
          ""title"": """",
          ""topic"": [],
          ""lesson"": [
            {{
              ""title"": ""Lesson title (specific skill/concept details with simple example)"",
              ""content"": ""Detailed explanation of what will be taught give me details here""
            }}
          ],
          ""problemPractice"": [],
          ""recommendedResource"": [
            {{
              ""title"": """",
              ""type"": """",
              ""link"": """"
            }}
          ],
          ""learningTip"": [],
          ""outcomes"": [],
          ""assessment"": """",
          ""nextModuleHint"": """",
          ""dependency"": []
        }}
      ]
    }}
  }},
  ""summary"": {{
    ""description"": ""This course is structured into beginner, intermediate, and advanced levels. Learners will start by understanding foundational concepts, progress through core skills and tools, and finally master advanced techniques. Each level builds upon the previous one with practical lessons, curated resources, and hands-on project work to ensure a comprehensive learning experience."",
    ""project"": [
      {{
        ""moduleLevel"": ""beginner"",
        ""moduleOrder"": 1,
        ""title"": ""Project Title"",
        ""description"": ""Brief project description that reflects learned skills""
      }},
      {{
        ""moduleLevel"": ""intermediate"",
        ""moduleOrder"": 1,
        ""title"": ""Project Title"",
        ""description"": ""Brief project description that reflects learned skills""
      }},
      {{
        ""moduleLevel"": ""advanced"",
        ""moduleOrder"": 1,
        ""title"": ""Project Title"",
        ""description"": ""Brief project description that reflects learned skills""
      }}
    ]
  }}
}}
CRITICAL RULES:
- Note Retrun same key in this json , becuse use it in front end , if change the front end give me error , plase give me same key in json
1. RESPOND WITH JSON ONLY - NO TEXT, NO MARKDOWN, NO EXPLANATIONS
2. START RESPONSE WITH {{ AND END WITH }}
3. at least 2 (can give me more the 2 if required) the prerequisites
3. NO ```json``` BLOCKS OR ANY FORMATTING
4. FILL ALL EMPTY FIELDS WITH REALISTIC CONTENT
5. at least 5+  MODULES PER LEVEL 
8. EACH MODULE MUST CONTAIN 4+ LESSONS (at least ,you can to add more 4 if required module this)
9. DO NOT OMIT THE `summary` FIELD UNDER ANY CIRCUMSTANCE.
10. add at least 5 projects .
EXAMPLE OUTPUT FORMAT (EXACT):
{{""courseTitle"":""value"",""targetAudience"":""value""...}}
VIOLATION = INVALID RESPONSE";
    }
    public const string ValidateTopic = @"
                                You are a validation AI that strictly determines whether a given topic can be used to create a professional, structured, technical learning course.
                                Rules:
                                - Reply only with 'yes' if the topic is clearly related to programming, computer science, software development, data science, artificial intelligence, DevOps, cloud computing, or other technical/IT fields.
                                - Reply only with 'no' if the topic is not suitable (e.g., music, dance, cooking).
                                - No punctuation, no explanations.
                                - Only say: yes or no.";

}
