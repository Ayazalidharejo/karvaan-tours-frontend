import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  CheckCircle,
  Star,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    tourType: "",
    message: "",
    travelDate: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        tourType: "",
        message: "",
        travelDate: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      details: [
        "Shibuya City, Tokyo 150-0002",
        "Japan Tourism Building, 5F",
        "Near JR Shibuya Station"
      ]
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "+81-3-1234-5678 (Main)",
        "+81-80-9876-5432 (Mobile)",
        "+81-3-1234-5679 (Emergency)"
      ]
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "info@carwantours.com",
        "bookings@carwantours.com",
        "support@carwantours.com"
      ]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 7:00 PM",
        "Saturday: 9:00 AM - 5:00 PM",
        "Sunday: 10:00 AM - 4:00 PM"
      ]
    }
  ];

  const tourTypes = [
    "Mount Fuji Day Tour",
    "Multi-day Japan Tour",
    "Cultural Experience",
    "Food & Cuisine Tour",
    "Private Custom Tour",
    "Group Tour",
    "Family Tour",
    "Adventure Tour",
    "Photography Tour",
    "Business Travel"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Get in touch with our Japan travel experts. We're here to help you plan your perfect journey.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <MessageSquare className="h-6 w-6 mr-3 text-primary" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="travelDate">Preferred Travel Date</Label>
                    <Input
                      id="travelDate"
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="tourType">Tour Type</Label>
                  <Select value={formData.tourType} onValueChange={(value) => setFormData({...formData, tourType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tour type" />
                    </SelectTrigger>
                    <SelectContent>
                      {tourTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="What can we help you with?"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your travel plans, preferences, and any special requirements..."
                    rows={6}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="hero"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Planning your dream trip to Japan? Our experienced travel consultants are here to help you create unforgettable memories. Whether you're interested in Mount Fuji, cultural experiences, or custom itineraries, we'll make your journey extraordinary.
              </p>
            </div>

            <div className="grid gap-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <Card key={index} className="border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                          <div className="space-y-1">
                            {info.details.map((detail, detailIndex) => (
                              <p key={detailIndex} className="text-muted-foreground">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Response Promise */}
            <Card className="border-0 shadow-elegant bg-gradient-subtle">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <h3 className="text-lg font-semibold">Quick Response Guarantee</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  We respond to all inquiries within 24 hours during business days. For urgent travel needs, call our emergency line.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>4.9/5 customer satisfaction</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Response time: &lt; 24 hours
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="border-0 shadow-elegant">
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-70" />
                    <p className="text-lg font-semibold">Find Us in Tokyo</p>
                    <p className="opacity-80">Interactive map coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                question: "How far in advance should I book?",
                answer: "We recommend booking 2-4 weeks in advance, especially for Mount Fuji tours during cherry blossom season."
              },
              {
                question: "Do you provide English-speaking guides?",
                answer: "Yes! All our tours include professional English-speaking guides. We also offer tours in Chinese, Korean, and Urdu."
              },
              {
                question: "What's included in the tour price?",
                answer: "Tour prices include transportation, guide fees, entrance tickets, and meals as specified in each tour package."
              },
              {
                question: "Can I customize my tour?",
                answer: "Absolutely! We specialize in creating custom itineraries based on your interests, schedule, and budget."
              },
              {
                question: "What's your cancellation policy?",
                answer: "Free cancellation up to 48 hours before the tour. Weather-related cancellations are fully refundable."
              },
              {
                question: "Do you offer group discounts?",
                answer: "Yes, we offer attractive discounts for groups of 6 or more people. Contact us for special group rates."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;