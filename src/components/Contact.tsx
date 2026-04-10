import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact: React.FC = () => {
  const { data } = usePortfolio();
  const { contact, settings } = data;
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const onSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      if (!settings.web3formsKey) {
        // Fallback simulation if no API key is set
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitSuccessful(true);
        reset();
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: settings.web3formsKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to: contact.email
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSubmitSuccessful(true);
        reset();
      } else {
        setSubmitError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-medium text-sm mb-4 border border-blue-500/20">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Discuss Your Data Needs
          </h2>
          <p className="text-slate-400 text-lg">
            Whether you need a complex dashboard, data cleaning, or AI-driven insights, I'm ready to help transform your data into a strategic asset.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-5/12">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-slate-400 mb-8">
                Fill out the form and I will get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg text-blue-400">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Email</h4>
                    <a href={`mailto:${contact.email}`} className="text-slate-400 hover:text-blue-400 transition-colors">
                      {contact.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg text-blue-400">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Phone</h4>
                    <a href={`tel:${contact.phone}`} className="text-slate-400 hover:text-blue-400 transition-colors">
                      {contact.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg text-blue-400">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Location</h4>
                    <p className="text-slate-400">
                      {contact.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-7/12">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
              {isSubmitSuccessful ? (
                <div className="h-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-600 dark:text-slate-400">Thank you for reaching out. I'll get back to you shortly.</p>
                  <button 
                    onClick={() => reset()}
                    className="mt-8 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {submitError && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
                      {submitError}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Name</label>
                      <input 
                        id="name"
                        type="text" 
                        {...register('name', { required: 'Name is required' })}
                        className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border ${errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Email</label>
                      <input 
                        id="email"
                        type="email" 
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                          }
                        })}
                        className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border ${errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                    <input 
                      id="subject"
                      type="text" 
                      {...register('subject', { required: 'Subject is required' })}
                      className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border ${errors.subject ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white`}
                      placeholder="Project Inquiry"
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                    <textarea 
                      id="message"
                      rows={5}
                      {...register('message', { required: 'Message is required' })}
                      className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border ${errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white resize-none`}
                      placeholder="Tell me about your data project..."
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
