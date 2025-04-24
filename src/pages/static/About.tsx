import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Users, Globe, Shield, Award } from 'lucide-react';

export const About = () => {
  const stats = [
    { label: 'Active Users', value: '100K+' },
    { label: 'Monthly Listings', value: '50K+' },
    { label: 'Successful Trades', value: '1M+' },
    { label: 'Countries', value: '25+' }
  ];

  const values = [
    {
      icon: <Users className="h-8 w-8 text-accent-400" />,
      title: 'Community First',
      description: 'We believe in the power of connecting people and building strong communities through trusted commerce.'
    },
    {
      icon: <Shield className="h-8 w-8 text-accent-400" />,
      title: 'Trust & Safety',
      description: 'Your security is our priority. We implement the highest standards of protection for all transactions.'
    },
    {
      icon: <Globe className="h-8 w-8 text-accent-400" />,
      title: 'Global Reach',
      description: 'Connect with buyers and sellers from around the world, expanding your opportunities beyond borders.'
    },
    {
      icon: <Award className="h-8 w-8 text-accent-400" />,
      title: 'Quality Service',
      description: 'We strive for excellence in every interaction, ensuring the best experience for our users.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-navy-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About TradeX
              </h1>
              <p className="text-xl text-gray-300">
                TradeX is more than just a marketplace - we're a community dedicated to connecting people through seamless trading experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-4xl font-bold text-navy-900">{stat.value}</p>
                  <p className="text-gray-600 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-navy-900 mb-6 text-center">
                Our Story
              </h2>
              <div className="prose prose-lg mx-auto text-gray-600">
                <p>
                  Founded in 2025, TradeX emerged from a simple idea: to create a platform where people could easily and safely buy, sell, and trade items while building meaningful connections within their communities.
                </p>
                <p>
                  What started as a local marketplace has grown into a global platform, connecting millions of users across the world. Our success is built on the trust of our community and our commitment to providing the best possible trading experience.
                </p>
                <p>
                  Today, TradeX continues to innovate and expand, always staying true to our core mission of empowering people through trusted commerce. Whether you're looking to buy, sell, find a job, or offer services, TradeX is your trusted partner.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-navy-900 mb-12 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="bg-navy-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-navy-900 mb-12 text-center">
              Our Leadership Team
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'Chief Executive Officer',
                  image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
                },
                {
                  name: 'Michael Chen',
                  role: 'Chief Technology Officer',
                  image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
                },
                {
                  name: 'Emily Rodriguez',
                  role: 'Chief Operating Officer',
                  image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};