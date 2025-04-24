import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  images: string[];
  condition: string;
  location: string;
  created_at: string;
  user_id: string;
}

export const BuyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('product')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } else {
        setProduct(data);
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/buy" className="text-blue-500 hover:underline flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Browse
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/buy" className="text-blue-500 hover:underline flex items-center mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Browse
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="rounded-lg overflow-hidden">
          <img 
            src={product.images?.[0]} 
            alt={product.title} 
            className="w-full h-auto object-cover"
          />
          <div className="grid grid-cols-4 gap-2 mt-2">
            {product.images?.map((img, index) => (
              <div key={index} className="cursor-pointer rounded-md overflow-hidden">
                <img 
                  src={img} 
                  alt={`${product.title} thumbnail ${index}`} 
                  className="w-full h-20 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <p className="text-gray-500 capitalize">{product.category}</p>
            </div>
            <div className="text-2xl font-bold text-blue-600">${product.price}</div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Condition</h3>
              <p>{product.condition}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Location</h3>
              <p>{product.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Posted</h3>
              <p>{new Date(product.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold flex items-center hover:bg-blue-700 flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </button>
            <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Heart className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
