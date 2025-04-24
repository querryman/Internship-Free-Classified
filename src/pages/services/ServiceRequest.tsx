import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { useAuth } from '../../context/AuthContext';

interface Service {
  id: string;
  title: string;
  provider: string;
  availability: string[];
}

export const ServiceRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    preferredDate: '',
    preferredTime: '',
    details: '',
  });

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('id, title, provider, availability')
        .eq('id', id)
        .single();

      if (error) throw error;
      setService(data);
    } catch (error) {
      console.error('Error fetching service details:', error);
      navigate('/services');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !service) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('service_requests').insert([
        {
          service_id: service.id,
          user_id: user.id,
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
          details: formData.details,
          status: 'pending'
        }
      ]);

      if (error) throw error;
      navigate('/services');
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting service request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Service not found</h2>
          <button
            onClick={() => navigate('/services')}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Request Service</h1>
        <p className="text-gray-600 mb-8">
          {service.title} by {service.provider}
        </p>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
              <input
                type="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Preferred Time</label>
              <input
                type="time"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              />
              <div className="mt-2">
                <p className="text-sm text-gray-600 font-medium">Available Times:</p>
                <ul className="mt-1 text-sm text-gray-500">
                  {service.availability.map((time, index) => (
                    <li key={index}>{time}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Details</label>
              <textarea
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Please provide any specific requirements or questions..."
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate(`/services/${id}`)}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};