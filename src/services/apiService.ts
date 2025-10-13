import type { Member } from '../interfaces/Member';
import type { Project } from '../interfaces/Project';
import type { Event } from '../interfaces/Event';
import type { ImpactPoint } from '../interfaces/ImpactPoint';

// Generic function to fetch data from JSON files
export async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    console.log(`Fetching ${endpoint} from JSON file...`);
    
    const response = await fetch(`/data/${endpoint}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch from local JSON: ${response.statusText}`);
    }
    const jsonData = await response.json();
    console.log(`Successfully fetched ${jsonData?.length || 0} records from local JSON (${endpoint})`);
    return jsonData as T;
  } catch (error) {
    console.error(`Error fetching from JSON file: ${error}`);
    throw error;
  }
}

// Individual functions for better type safety
export async function fetchMembers(): Promise<Member[]> {
  return fetchData<Member[]>('members');
}

export async function fetchProjects(): Promise<Project[]> {
  return fetchData<Project[]>('projects');
}

export async function fetchEvents(): Promise<Event[]> {
  return fetchData<Event[]>('events');
}

export async function fetchImpactPoints(): Promise<ImpactPoint[]> {
  return fetchData<ImpactPoint[]>('impact_points');
}