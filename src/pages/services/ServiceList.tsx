import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { Wrench } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  provider: string;
  category: string;
  price: string;
  description: string;
  created_at: string;
}

export const ServiceList = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Available Services</h1>
          <Link
            to="/services/create"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Offer a Service
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <Wrench className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900">{service.title}</h2>
                  <p className="text-gray-600">{service.provider}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">{service.category}</p>
                <p className="text-green-600 font-medium">{service.price}</p>
                <p className="text-gray-500 line-clamp-2">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No services found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by offering a new service.</p>
          </div>
        )}
      </div>
    </div>
  );
};