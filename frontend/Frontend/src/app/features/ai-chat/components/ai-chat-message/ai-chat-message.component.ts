import { AfterViewInit, Component, EventEmitter, Inject, Output, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { Course, CourseSummary } from '../../../../core/interfaces/ICourse';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { LevelComponent } from "../level/level.component";
import { ChatService } from '../../../../core/services/Chat.service';
import { tap } from 'rxjs';
@Component({
  selector: 'app-ai-chat-message',
  standalone: true,
  imports: [CommonModule, NgxGraphModule, LevelComponent],
  templateUrl: './ai-chat-message.component.html',
  styleUrls: ['./ai-chat-message.component.css'],
  animations: [
    trigger('fadeUpDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-5%)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10%)' }))
      ])
    ])
  ]


})
export class AiChatMessageComponent implements AfterViewInit {
  @Output() summaryData = new EventEmitter<CourseSummary>();
  @Output() openSidebarSummary = new EventEmitter<boolean>();
  courseData: Course= {
    courseTitle: "Mastering Backend Development with ASP.NET Web API",
    targetAudience: "Aspiring backend developers, .NET enthusiasts, and software engineers transitioning to web API development",
    prerequisites: [
      {
        category: "Programming Knowledge",
        items: ["C# Basics", "Object-Oriented Programming", "Basic Data Structures"]
      },
      {
        category: "Web Concepts",
        items: ["HTTP Protocol", "REST Architecture", "JSON Format"]
      },
      {
        category: ".NET Ecosystem",
        items: ["Basic understanding of .NET Core or .NET 5+"]
      }
    ],
    learningRoadmap: {
      beginnerLevel: {
        objective: "Understand the fundamentals of backend development and ASP.NET Web API basics.",
        module: [
          {
            level: "beginner",
            order: 1,
            title: "Introduction to ASP.NET Web API",
            topic: ["What is a Web API?", "ASP.NET Core Overview", "Creating Your First API"],
            lesson: [
              { title: "What is ASP.NET Web API?", content: "Explains the purpose and benefits of using ASP.NET Web API for backend development." },
              { title: "Setting Up Environment", content: "Step-by-step guide on setting up Visual Studio and .NET SDK." }
            ],
            problemPractice: ["Create a simple Hello World API"],
            recommendedResource: [
              { title: "Microsoft Docs: ASP.NET Core Web API", type: "Documentation", link: "https://learn.microsoft.com/en-us/aspnet/core/web-api/" }
            ],
            learningTips: ["Start with small projects", "Use Swagger to test APIs easily"],
            outcomes: ["Understand basic API concepts", "Create and run a simple API project"],
            assessment: "Quiz on REST principles and basic Web API structure",
            nextModuleHint: "Learn how to manage data using Entity Framework Core.",
            dependency: []
          },
          {
            level: "beginner",
            order: 2,
            title: "Routing and Controllers",
            topic: ["Controller Setup", "Routing Patterns", "HTTP Verbs"],
            lesson: [
              { title: "Understanding Routing", content: "Learn how ASP.NET handles route mapping." },
              { title: "Creating Controllers", content: "Write controllers to handle incoming HTTP requests." }
            ],
            problemPractice: ["Create a Products controller with GET/POST methods"],
            recommendedResource: [
              { title: "Routing in ASP.NET Core", type: "Tutorial", link: "https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/routing" }
            ],
            learningTips: ["Keep routes clean and RESTful"],
            outcomes: ["Able to configure routes and create RESTful endpoints"],
            assessment: "Practical task: Build a basic CRUD controller",
            nextModuleHint: "Now let's store and retrieve data using EF Core.",
            dependency: ["Introduction to ASP.NET Web API"]
          }
        ]
      },
      intermediateLevel: {
        objective: "Handle data, validation, and apply best practices in API development.",
        module: [
          {
            level: "intermediate",
            order: 3,
            title: "Working with Entity Framework Core",
            topic: ["DbContext", "Migrations", "Data Annotations"],
            lesson: [
              { title: "Integrating EF Core", content: "Connect your API to a database using EF Core." },
              { title: "CRUD Operations with EF", content: "Implement Create, Read, Update, Delete using EF." }
            ],
            problemPractice: ["Build a Book Store API with full CRUD using EF Core"],
            recommendedResource: [
              { title: "EF Core Docs", type: "Documentation", link: "https://learn.microsoft.com/en-us/ef/core/" }
            ],
            learningTips: ["Understand relationships (One-to-Many, Many-to-Many)", "Use migration commands carefully"],
            outcomes: ["Data is persisted and retrieved through API endpoints"],
            assessment: "Assignment: Build a simple relational data model and API",
            nextModuleHint: "Secure your API using authentication.",
            dependency: ["Routing and Controllers"]
          },
          {
            level: "intermediate",
            order: 4,
            title: "Authentication and Authorization",
            topic: ["JWT Tokens", "Role-based Authorization", "ASP.NET Identity"],
            lesson: [
              { title: "JWT Basics", content: "Understand how JSON Web Tokens work in authentication." },
              { title: "Applying Authentication", content: "Secure your endpoints with ASP.NET Identity and JWT." }
            ],
            problemPractice: ["Add login/signup functionality with token-based access"],
            recommendedResource: [
              { title: "Securing Web APIs", type: "Tutorial", link: "https://learn.microsoft.com/en-us/aspnet/core/security/authentication/" }
            ],
            learningTips: ["Use middleware wisely", "Keep secrets out of source control"],
            outcomes: ["Secure APIs from unauthorized access"],
            assessment: "Security Quiz and API token implementation",
            nextModuleHint: "Make your APIs production-ready with logging and error handling.",
            dependency: ["Working with Entity Framework Core"]
          }
        ]
      },
      advancedLevel: {
        objective: "Build production-ready APIs with performance tuning and documentation.",
        module: [
          {
            level: "advanced",
            order: 5,
            title: "Advanced Topics and API Best Practices",
            topic: ["Versioning", "Logging", "Error Handling", "Caching"],
            lesson: [
              { title: "API Versioning", content: "Support multiple versions of your API." },
              { title: "Implementing Logging and Monitoring", content: "Track issues and log API calls." }
            ],
            problemPractice: ["Implement global error handling and request logging"],
            recommendedResource: [
              { title: "API Design Best Practices", type: "Article", link: "https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design" }
            ],
            learningTips: ["Always log errors", "Use filters for reusable functionality"],
            outcomes: ["Robust, scalable, and well-documented APIs"],
            assessment: "Final Project and Code Review",
            nextModuleHint: "Time to apply everything in a final project!",
            dependency: ["Authentication and Authorization"]
          }
        ]
      }
    },
    summary: {
      description: "This course provides a comprehensive guide to building scalable, secure, and maintainable backend systems using ASP.NET Web API. You will start from scratch and work your way to advanced concepts, applying best practices throughout.",
      project: [
        {
          moduleLevel: "intermediate",
          moduleOrder: 4,
          title: "User Authentication System",
          description: "Build a user management system with JWT-based authentication and role-based access control."
        },
        {
          moduleLevel: "advanced",
          moduleOrder: 5,
          title: "Online Book Store API",
          description: "Complete backend with products, users, cart, orders, and logging, versioning, and security."
        }
      ]
    },
   
  }; 

  public placeholderMessage: string | null = '';
  public hideFake: boolean = true;
  public isDowen: boolean = true;
  public isLoading: boolean = false;
  public errorMessage: string | null = null;
  private index = 0;
  private isBrowser = signal(false);

  private messages = [
    "How can I help you?",
    "Need assistance with something?",
    "Ask me anything!",
    "Let's explore ideas together."
  ];

  constructor(@Inject(PLATFORM_ID) platformId: object, private chatService: ChatService) {
    this.isBrowser.set(isPlatformBrowser(platformId));

  }

  ngAfterViewInit(): void {
   this.summaryData.emit(this.courseData.summary)
   this.openSidebarSummary.emit(true)
    if (this.isBrowser()) {
      this.placeholderMessage = this.messages[this.index];
      setInterval(() => {
        this.placeholderMessage = null;
        setTimeout(() => {
          this.index = (this.index + 1) % this.messages.length;
          this.placeholderMessage = this.messages[this.index];
        }, 200);
      }, 3000);
    }
  }
  onEnter(event: any) {
    const textarea = event.target as HTMLTextAreaElement;
    const message = textarea.value.trim();
    this.hideFake = true;
    if (message) {
      this.isDowen = true;
      this.isLoading = true;
      this.errorMessage = null;

      this.chatService.generateCoursePlan(message)
        .subscribe({
          next: (response) => {
            if (response) {
              this.courseData = response;
              this.summaryData.emit(response.summary);
              console.log(response);
              this.isLoading = false;
            }
          },
          error: (error) => {
            this.errorMessage = 'Failed to generate course plan. Please try again.';
            this.isLoading = false;
            this.isDowen = false;
            console.error('Error generating course plan:', error);
          },
          complete: () => {
            this.isLoading = false;
            this.openSidebarSummary.emit(true);

          }
        });
    }
    textarea.value = '';
  }
  public isEmpty(): boolean {
    return !this.courseData;
  }
}


/*
= {
    courseTitle: "Mastering Backend Development with ASP.NET Web API",
    targetAudience: "Aspiring backend developers, .NET enthusiasts, and software engineers transitioning to web API development",
    prerequisites: [
      {
        category: "Programming Knowledge",
        items: ["C# Basics", "Object-Oriented Programming", "Basic Data Structures"]
      },
      {
        category: "Web Concepts",
        items: ["HTTP Protocol", "REST Architecture", "JSON Format"]
      },
      {
        category: ".NET Ecosystem",
        items: ["Basic understanding of .NET Core or .NET 5+"]
      }
    ],
    learningRoadmap: {
      beginnerLevel: {
        objective: "Understand the fundamentals of backend development and ASP.NET Web API basics.",
        module: [
          {
            level: "beginner",
            order: 1,
            title: "Introduction to ASP.NET Web API",
            topic: ["What is a Web API?", "ASP.NET Core Overview", "Creating Your First API"],
            lesson: [
              { title: "What is ASP.NET Web API?", content: "Explains the purpose and benefits of using ASP.NET Web API for backend development." },
              { title: "Setting Up Environment", content: "Step-by-step guide on setting up Visual Studio and .NET SDK." }
            ],
            problemPractice: ["Create a simple Hello World API"],
            recommendedResource: [
              { title: "Microsoft Docs: ASP.NET Core Web API", type: "Documentation", link: "https://learn.microsoft.com/en-us/aspnet/core/web-api/" }
            ],
            learningTips: ["Start with small projects", "Use Swagger to test APIs easily"],
            outcomes: ["Understand basic API concepts", "Create and run a simple API project"],
            technologiesUsed: [".NET 6", "Swagger", "Visual Studio"],
            assessment: "Quiz on REST principles and basic Web API structure",
            nextModuleHint: "Learn how to manage data using Entity Framework Core.",
            dependency: []
          },
          {
            level: "beginner",
            order: 2,
            title: "Routing and Controllers",
            topic: ["Controller Setup", "Routing Patterns", "HTTP Verbs"],
            lesson: [
              { title: "Understanding Routing", content: "Learn how ASP.NET handles route mapping." },
              { title: "Creating Controllers", content: "Write controllers to handle incoming HTTP requests." }
            ],
            problemPractice: ["Create a Products controller with GET/POST methods"],
            recommendedResource: [
              { title: "Routing in ASP.NET Core", type: "Tutorial", link: "https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/routing" }
            ],
            learningTips: ["Keep routes clean and RESTful"],
            outcomes: ["Able to configure routes and create RESTful endpoints"],
            technologiesUsed: ["ASP.NET Core", "Routing Attributes"],
            assessment: "Practical task: Build a basic CRUD controller",
            nextModuleHint: "Now let's store and retrieve data using EF Core.",
            dependency: ["Introduction to ASP.NET Web API"]
          }
        ]
      },
      intermediateLevel: {
        objective: "Handle data, validation, and apply best practices in API development.",
        module: [
          {
            level: "intermediate",
            order: 3,
            title: "Working with Entity Framework Core",
            topic: ["DbContext", "Migrations", "Data Annotations"],
            lesson: [
              { title: "Integrating EF Core", content: "Connect your API to a database using EF Core." },
              { title: "CRUD Operations with EF", content: "Implement Create, Read, Update, Delete using EF." }
            ],
            problemPractice: ["Build a Book Store API with full CRUD using EF Core"],
            recommendedResource: [
              { title: "EF Core Docs", type: "Documentation", link: "https://learn.microsoft.com/en-us/ef/core/" }
            ],
            learningTips: ["Understand relationships (One-to-Many, Many-to-Many)", "Use migration commands carefully"],
            outcomes: ["Data is persisted and retrieved through API endpoints"],
            technologiesUsed: ["EF Core", "SQL Server", ".NET"],
            assessment: "Assignment: Build a simple relational data model and API",
            nextModuleHint: "Secure your API using authentication.",
            dependency: ["Routing and Controllers"]
          },
          {
            level: "intermediate",
            order: 4,
            title: "Authentication and Authorization",
            topic: ["JWT Tokens", "Role-based Authorization", "ASP.NET Identity"],
            lesson: [
              { title: "JWT Basics", content: "Understand how JSON Web Tokens work in authentication." },
              { title: "Applying Authentication", content: "Secure your endpoints with ASP.NET Identity and JWT." }
            ],
            problemPractice: ["Add login/signup functionality with token-based access"],
            recommendedResource: [
              { title: "Securing Web APIs", type: "Tutorial", link: "https://learn.microsoft.com/en-us/aspnet/core/security/authentication/" }
            ],
            learningTips: ["Use middleware wisely", "Keep secrets out of source control"],
            outcomes: ["Secure APIs from unauthorized access"],
            technologiesUsed: ["JWT", "ASP.NET Identity"],
            assessment: "Security Quiz and API token implementation",
            nextModuleHint: "Make your APIs production-ready with logging and error handling.",
            dependency: ["Working with Entity Framework Core"]
          }
        ]
      },
      advancedLevel: {
        objective: "Build production-ready APIs with performance tuning and documentation.",
        module: [
          {
            level: "advanced",
            order: 5,
            title: "Advanced Topics and API Best Practices",
            topic: ["Versioning", "Logging", "Error Handling", "Caching"],
            lesson: [
              { title: "API Versioning", content: "Support multiple versions of your API." },
              { title: "Implementing Logging and Monitoring", content: "Track issues and log API calls." }
            ],
            problemPractice: ["Implement global error handling and request logging"],
            recommendedResource: [
              { title: "API Design Best Practices", type: "Article", link: "https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design" }
            ],
            learningTips: ["Always log errors", "Use filters for reusable functionality"],
            outcomes: ["Robust, scalable, and well-documented APIs"],
            technologiesUsed: ["Serilog", "HealthChecks", "API Versioning"],
            assessment: "Final Project and Code Review",
            nextModuleHint: "Time to apply everything in a final project!",
            dependency: ["Authentication and Authorization"]
          }
        ]
      }
    },
    summary: {
      description: "This course provides a comprehensive guide to building scalable, secure, and maintainable backend systems using ASP.NET Web API. You will start from scratch and work your way to advanced concepts, applying best practices throughout.",
      project: [
        {
          moduleLevel: "intermediate",
          moduleOrder: 4,
          title: "User Authentication System",
          description: "Build a user management system with JWT-based authentication and role-based access control."
        },
        {
          moduleLevel: "advanced",
          moduleOrder: 5,
          title: "Online Book Store API",
          description: "Complete backend with products, users, cart, orders, and logging, versioning, and security."
        }
      ]
    },
    graph: {
      nodes: [
        { id: "1", label: "Intro to Web API" },
        { id: "2", label: "Routing & Controllers" },
        { id: "3", label: "Entity Framework Core" },
        { id: "4", label: "Authentication & Auth" },
        { id: "5", label: "Advanced Practices" }
      ],
      links: [
        { source: "1", target: "2" },
        { source: "2", target: "3" },
        { source: "3", target: "4" },
        { source: "4", target: "5" }
      ]
    }
  };
*/