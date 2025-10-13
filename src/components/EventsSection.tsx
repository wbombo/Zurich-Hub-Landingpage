import React, { useEffect, useState } from 'react';
import { Event } from '../interfaces/Event';
import { fetchEvents } from '../services/apiService';

const EventsSection: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        fetchEvents()
            .then((data: Event[]) => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <section className="bg-gray-100 py-16" id="events">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 text-center">Past Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {events.map(event => (
                        <div key={event.id} className="shadow-md rounded-lg overflow-hidden">
                            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                <p className="text-gray-700">{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventsSection;
