import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Create or retrieve a unique client ID to track visitors
const getClientId = (): string => {
  // Check if we already have a client ID in localStorage
  let clientId = localStorage.getItem('visitor_client_id');
  
  // If no client ID exists, create a new one and store it
  if (!clientId) {
    // For browsers without localStorage, fall back to a simple random ID
    try {
      clientId = uuidv4();
      localStorage.setItem('visitor_client_id', clientId);
    } catch (e) {
      // Fallback if localStorage is not available
      clientId = `visitor-${Math.random().toString(36).substring(2, 15)}`;
    }
  }
  
  return clientId;
};

const useVisitorCount = () => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [clientId] = useState<string>(() => getClientId());

  useEffect(() => {
    let socket: WebSocket | null = null;
    let mounted = true;

    const fetchCount = async () => {
      try {
        const response = await fetch('/api/visitors');
        if (!response.ok) {
          throw new Error('Failed to fetch visitor count');
        }
        
        const data = await response.json();
        if (mounted) {
          setCount(data.count);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching visitor count:', err);
        if (mounted) {
          setError('Failed to load visitor count');
          setLoading(false);
        }
      }
    };

    const incrementCount = async () => {
      try {
        // Send the client ID with the request
        const response = await fetch('/api/visitors/increment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ clientId }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to increment visitor count');
        }
      } catch (err) {
        console.error('Error incrementing visitor count:', err);
      }
    };

    const connectWebSocket = () => {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      
      socket = new WebSocket(wsUrl);
      
      socket.onopen = () => {
        console.log('WebSocket connected');
      };
      
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'visitorCount' && mounted) {
            setCount(data.count);
            setLoading(false);
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };
      
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        if (mounted) {
          setError('Connection error');
        }
      };
      
      socket.onclose = () => {
        console.log('WebSocket disconnected');
        // Try to reconnect after a short delay
        if (mounted) {
          setTimeout(() => {
            connectWebSocket();
          }, 3000);
        }
      };
    };

    // First, fetch the current count
    fetchCount();
    
    // Then, check and increment if needed (only once on component mount)
    incrementCount();
    
    // Connect to WebSocket for real-time updates
    connectWebSocket();

    return () => {
      mounted = false;
      if (socket) {
        socket.close();
      }
    };
  }, [clientId]); // Add clientId to dependencies

  return { count, loading, error };
};

export default useVisitorCount;