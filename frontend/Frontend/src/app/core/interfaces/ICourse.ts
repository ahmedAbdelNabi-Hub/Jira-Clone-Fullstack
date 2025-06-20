export interface Course {
    courseTitle: string;
    targetAudience: string;
    prerequisites: PrerequisiteCategory[];
    learningRoadmap: LearningRoadmap;
    summary: CourseSummary;
}

export interface PrerequisiteCategory {
    category: string;
    items: string[];
}

export interface LearningRoadmap {
    beginnerLevel: Level;
    intermediateLevel: Level;
    advancedLevel: Level;
}

export interface Level {
    objective: string;
    module: CourseModule[];
}

export interface CourseModule {
    level: 'beginner' | 'intermediate' | 'advanced';
    order: number;
    title: string;
    topic: string[];
    lesson: Lesson[];
    problemPractice: string[];
    recommendedResource: Resource[];
    learningTips: string[];
    outcomes: string[];
    assessment: string;
    nextModuleHint: string;
    dependency: string[];
    isExpanded?: boolean
}

export interface Lesson {
    title: string;
    content: string;
}

export interface Resource {
    title: string;
    type: string;
    link: string;
}

export interface CourseSummary {
    description: string;
    project: CourseProject[];
}

export interface CourseProject {
    moduleLevel: 'beginner' | 'intermediate' | 'advanced';
    moduleOrder: number;
    title: string;
    description: string;
}

export interface CourseGraph {
    nodes: GraphNode[];
    links: GraphLink[];
}

export interface GraphNode {
    id: string;
    label: string;
}

export interface GraphLink {
    source: string;
    target: string;
}
