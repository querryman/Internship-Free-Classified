import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { Wrench, User, Tag, DollarSign, Calendar } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  provider: string;
  category: string;
  price: string;
  description: string;
  availability: string[];
  created_at: string;
}

export const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
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
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
            <button
              onClick={() => navigate(`/services/${id}/request`)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Request Service
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center text-gray-600">
              <User className="h-5 w-5 mr-2" />
              <span>{service.provider}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Tag className="h-5 w-5 mr-2" />
              <span>{service.category}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-5 w-5 mr-2" />
              <span>{service.price}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{new Date(service.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">Service Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{service.description}</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Availability</h2>
            <ul className="list-disc list-inside space-y-2">
              {service.availability?.map((time, index) => (
                <li key={index} className="text-gray-700">{time}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};