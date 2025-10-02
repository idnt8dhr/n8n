import { ApplicationError, type INodeTypeNameVersion } from 'n8n-workflow';
import type { WorkflowDataWithTemplateId } from '@/Interface';
import { isWorkflowDataWithTemplateId } from '@/utils/templates/typeGuards';
/* eslint-disable import-x/extensions */
import easyAiStarterJson from '@/utils/templates/samples/easy_ai_starter.json';
import ragStarterJson from '@/utils/templates/samples/rag_starter.json';
import emailTriageAgentWithGmailJson from '@/utils/templates/samples/agents/email_triage_agent_with_gmail.json';
import jokeAgentWithHttpToolJson from '@/utils/templates/samples/agents/joke_agent_with_http_tool.json';
import knowledgeStoreAgentWithGoogleDriveJson from '@/utils/templates/samples/agents/knowledge_store_agent_with_google_drive.json';
import taskManagementAgentWithGoogleSheetsJson from '@/utils/templates/samples/agents/task_management_agent_with_google_sheets.json';
import voiceAssistantAgentJson from '@/utils/templates/samples/agents/voice-agent.json';
import wooCommerceProductCreatorAgentJson from '@/utils/templates/samples/agents/woocommerce_product_creator_agent.json';
import socialKeywordCommentAgentJson from '@/utils/templates/samples/agents/social_keyword_comment_agent.json';
import marsAtmosphereMonitorAgentJson from '@/utils/templates/samples/agents/mars_atmosphere_monitor_agent.json';
import calendarAgentJson from '@/utils/templates/samples/agents/calendar-agent.json';
import buildYourFirstAiAgentJson from '@/utils/templates/samples/tutorial/build_your_first_ai_agent.json';
import jsonBasicsJson from '@/utils/templates/samples/tutorial/json_basics.json';
import expressionsTutorialJson from '@/utils/templates/samples/tutorial/expressions_tutorial.json';
import workflowLogicJson from '@/utils/templates/samples/tutorial/workflow_logic.json';
import apiFundamentalsJson from '@/utils/templates/samples/tutorial/api_fundamentals.json';
/* eslint-enable import-x/extensions */

const getWorkflowJson = (json: unknown): WorkflowDataWithTemplateId => {
	if (!isWorkflowDataWithTemplateId(json)) {
		throw new ApplicationError('Invalid workflow template JSON structure');
	}

	return json;
};

export const getEasyAiWorkflowJson = (): WorkflowDataWithTemplateId => {
	return getWorkflowJson(easyAiStarterJson);
};

export const getRagStarterWorkflowJson = (): WorkflowDataWithTemplateId => {
	return getWorkflowJson(ragStarterJson);
};

export const SampleTemplates = {
	RagStarterTemplate: getRagStarterWorkflowJson().meta.templateId,
	EasyAiTemplate: getEasyAiWorkflowJson().meta.templateId,
} as const;

export const PrebuiltAgentTemplates = {
	CalendarAgent: getWorkflowJson(calendarAgentJson).meta.templateId,
	EmailTriageAgent: getWorkflowJson(emailTriageAgentWithGmailJson).meta.templateId,
	KnowledgeStoreAgent: getWorkflowJson(knowledgeStoreAgentWithGoogleDriveJson).meta.templateId,
	TaskManagementAgent: getWorkflowJson(taskManagementAgentWithGoogleSheetsJson).meta.templateId,
	JokeAgent: getWorkflowJson(jokeAgentWithHttpToolJson).meta.templateId,
	VoiceAssistantAgent: getWorkflowJson(voiceAssistantAgentJson).meta.templateId,
	WooCommerceProductCreatorAgent: getWorkflowJson(wooCommerceProductCreatorAgentJson).meta
		.templateId,
	SocialKeywordCommentAgent: getWorkflowJson(socialKeywordCommentAgentJson).meta.templateId,
	MarsAtmosphereMonitorAgent: getWorkflowJson(marsAtmosphereMonitorAgentJson).meta.templateId,
} as const;

export const TutorialTemplates = {
	BuildYourFirstAiAgent: getWorkflowJson(buildYourFirstAiAgentJson).meta.templateId,
	JsonBasics: getWorkflowJson(jsonBasicsJson).meta.templateId,
	Expressions: getWorkflowJson(expressionsTutorialJson).meta.templateId,
	WorkflowLogic: getWorkflowJson(workflowLogicJson).meta.templateId,
	ApiFundamentals: getWorkflowJson(apiFundamentalsJson).meta.templateId,
} as const;

export const isPrebuiltAgentTemplateId = (value: string): boolean => {
	return Object.values(PrebuiltAgentTemplates).includes(value);
};

export const isTutorialTemplateId = (value: string): boolean => {
	return Object.values(TutorialTemplates).includes(value);
};

interface SampleTemplate {
	template: WorkflowDataWithTemplateId;
	name: string;
	description: string;
	nodes: INodeTypeNameVersion[];
}

export const getPrebuiltAgents = (): SampleTemplate[] => {
	return [
		{
			name: 'Voice assistant agent',
			description: 'Personal AI assistant in Telegram, handling both text and voice messages.',
			template: getWorkflowJson(voiceAssistantAgentJson),
			nodes: [
				{
					name: 'n8n-nodes-base.telegram',
					version: 1.2,
				},
			],
		},
		{
			name: 'Email triage agent',
			description:
				'Categorizes new, unread emails by analyzing their content and applying relevant labels.',
			template: getWorkflowJson(emailTriageAgentWithGmailJson),
			nodes: [
				{
					name: 'n8n-nodes-base.gmail',
					version: 2.1,
				},
			],
		},
		{
			name: 'Knowledge store agent',
			description:
				'Retrieve, analyze, and answer questions using documents uploaded to Google Drive.',
			template: getWorkflowJson(knowledgeStoreAgentWithGoogleDriveJson),
			nodes: [
				{
					name: 'n8n-nodes-base.googleDrive',
					version: 3,
				},
			],
		},
		{
			name: 'Calendar agent',
			description:
				'Agent that can interact with your Google calendar to get availability and a list of events.',
			template: getWorkflowJson(calendarAgentJson),
			nodes: [
				{
					name: 'n8n-nodes-base.googleCalendar',
					version: 1.3,
				},
			],
		},
		{
			name: 'Task management agent',
			description:
				'Task management assistant that helps users create, view, update, and delete tasks.',
			template: getWorkflowJson(taskManagementAgentWithGoogleSheetsJson),
			nodes: [
				{
					name: 'n8n-nodes-base.googleSheets',
					version: 4.7,
				},
			],
		},
		{
			name: 'Joke agent',
			description: 'Uses the Joke API via the HTTP tool to deliver fun, personalized jokes.',
			template: getWorkflowJson(jokeAgentWithHttpToolJson),
			nodes: [
				{
					name: 'n8n-nodes-base.httpRequest',
					version: 4.2,
				},
			],
		},
		{
			name: 'WooCommerce product creator agent',
			description:
				'Conversational assistant that collects product requirements and publishes new items to WooCommerce.',
			template: getWorkflowJson(wooCommerceProductCreatorAgentJson),
			nodes: [
				{
					name: 'n8n-nodes-base.wooCommerce',
					version: 1,
				},
			],
		},
		{
			name: 'Social keyword commenter agent',
			description:
				'Monitors keyword-aligned conversations across major social platforms and posts approved comments on behalf of your brand.',
			template: getWorkflowJson(socialKeywordCommentAgentJson),
			nodes: [
				{
					name: 'n8n-nodes-base.facebookGraphApi',
					version: 1,
				},
				{
					name: 'n8n-nodes-base.httpRequest',
					version: 4.2,
				},
			],
		},
		{
			name: 'Mars atmosphere monitor agent',
			description:
				'Analyzes Mars atmospheric telemetry alongside Earth space-weather indicators to highlight potential cross-planet impacts.',
			template: getWorkflowJson(marsAtmosphereMonitorAgentJson),
			nodes: [
				{
					name: 'n8n-nodes-base.httpRequest',
					version: 4.2,
				},
			],
		},
	];
};

export const getTutorialTemplates = (): SampleTemplate[] => {
	return [
		{
			name: 'Build your first AI agent',
			description:
				'This template launches your very first AI Agent —an AI-powered chatbot that can do more than just talk— it can take action using tools.',
			template: getWorkflowJson(buildYourFirstAiAgentJson),
			nodes: [],
		},
		{
			name: 'JSON basics',
			description:
				'Designed to teach you the absolute basics of JSON (JavaScript Object Notation) and, more importantly, how to use it within n8n.',
			template: getWorkflowJson(jsonBasicsJson),
			nodes: [],
		},
		{
			name: 'Expressions',
			description:
				'Step-by-step tutorial designed to teach you the most important skill in n8n: using expressions to access and manipulate data.',
			template: getWorkflowJson(expressionsTutorialJson),
			nodes: [],
		},
		{
			name: 'Workflow logic',
			description:
				'This template is a hands-on tutorial that teaches you the three most fundamental nodes for controlling the flow of your automations: Merge, IF, and Switch.',
			template: getWorkflowJson(workflowLogicJson),
			nodes: [],
		},
		{
			name: 'API fundamentals',
			description:
				'Hands-on tutorial designed to demystify what an API is and how it works, right inside your n8n canvas.',
			template: getWorkflowJson(apiFundamentalsJson),
			nodes: [],
		},
	];
};

export const getSampleWorkflowByTemplateId = (
	templateId: string,
): WorkflowDataWithTemplateId | undefined => {
	const workflows = [
		getEasyAiWorkflowJson(),
		getRagStarterWorkflowJson(),
		...getPrebuiltAgents().map((agent) => agent.template),
		...getTutorialTemplates().map((tutorial) => tutorial.template),
	];

	return workflows.find((workflow) => workflow.meta.templateId === templateId);
};
