import axios, { AxiosResponse } from 'axios';

const baseURL = 'https://forum.climatedao.xyz';

const client = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
    'Api-Key': process.env.NEXT_PUBLIC_DISCOURSE_API_KEY!, 
    'Api-Username': process.env.NEXT_PUBLIC_DISCOURSE_USERNAME!,
  }
});

type Thread = {
  title: string;
  type: string;
  quantity: string;
  symbol: string;
  companyName: string;
  description: string;
  createdAt: string;
  deadline: string;
}

type DiscourseThread = {
    id: number;
    name: string;
    username: string;
    avatar_template: string;
    created_at: string;
    cooked: string;
    post_number: number;
    post_type: number;
    updated_at: string;
    reply_count: number;
    reply_to_post_number: any | null;
    quote_count: number;
    incoming_link_count: number;
    reads: number;
    readers_count: number;
    score: number;
    yours: boolean;
    topic_id: number;
    topic_slug: string;
    display_username: string;
    primary_group_name: string | null;
    flair_name: string | null;
    flair_url: string | null;
    flair_bg_color: string | null;
    flair_color: string | null;
    version: number;
    can_edit: boolean;
    can_delete: boolean;
    can_recover: boolean;
    can_wiki: boolean;
    user_title: string | null;
    bookmarked: boolean;
    raw: string;
    actions_summary: Array<any>;
    moderator: boolean;
    admin: boolean;
    staff: boolean;
    user_id: number;
    draft_sequence: number;
    hidden: boolean;
    trust_level: number;
    deleted_at: string | null;
    user_deleted: boolean;
    edit_reason: any | null;
    can_view_edit_history: boolean;
    wiki: boolean;
    user_created_at: string;
    user_date_of_birth: any | null;
    can_accept_answer: boolean;
    can_unaccept_answer: boolean;
    accepted_answer: boolean;
};

export async function createCampaignThread (thread: any): Promise<AxiosResponse> {
  const data = JSON.parse(thread);
  return client.post('/posts.json', {
    title: data.title,
    raw: data.description,
  });
}


export async function fetchCampaignThread (id: number): Promise<DiscourseThread> {
  const response = await client.get(`/posts/${id}.json`);
  return response.data;
}

export async function fetchCampaignThreadReplies (id: number):
  Promise<DiscourseThread[]> {
  const response = await client.get(`/t/${id}/posts.json`);
  return response.data;
}