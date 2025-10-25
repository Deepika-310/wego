import { Button } from './ui/button';
import { Users, Briefcase, TrendingUp, Star, MapPin, DollarSign, Clock, Shield } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface LandingPageProps {
  onSelectRole: (role: 'recruiter' | 'worker') => void;
}

export function LandingPage({ onSelectRole }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">W</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                WEgo
              </h1>
              <p className="text-xs text-muted-foreground">Work Earn and Go</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">About</Button>
            <Button variant="ghost" size="sm">Help</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block mb-4">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              🚀 India's Fastest Growing Gig Platform
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Find Work. Hire Talent.
            <br />
            All in One Place.
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with opportunities or find the perfect talent for short-term gigs.
            Quick, easy, and reliable.
          </p>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Worker Card */}
            <Card className="relative overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 hover:border-blue-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full -mr-16 -mt-16 opacity-10 group-hover:scale-150 transition-transform duration-500" />
              <CardContent className="p-8 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">I'm a Worker</h3>
                <p className="text-muted-foreground mb-6">
                  Find flexible gigs near you and start earning today
                </p>
                <ul className="space-y-2 text-sm text-left mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600">✓</span>
                    </div>
                    Browse jobs on interactive map
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600">✓</span>
                    </div>
                    Get instant notifications for nearby jobs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600">✓</span>
                    </div>
                    Track hours with QR codes
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600">✓</span>
                    </div>
                    Chat directly with recruiters
                  </li>
                </ul>
                <Button
                  onClick={() => onSelectRole('worker')}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                  size="lg"
                >
                  Continue as Worker
                </Button>
              </CardContent>
            </Card>

            {/* Recruiter Card */}
            <Card className="relative overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 hover:border-purple-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full -mr-16 -mt-16 opacity-10 group-hover:scale-150 transition-transform duration-500" />
              <CardContent className="p-8 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">I'm a Recruiter</h3>
                <p className="text-muted-foreground mb-6">
                  Post jobs and find verified workers instantly
                </p>
                <ul className="space-y-2 text-sm text-left mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600">✓</span>
                    </div>
                    Post jobs in under 2 minutes
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600">✓</span>
                    </div>
                    View ratings and work history
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600">✓</span>
                    </div>
                    Manage applicants easily
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600">✓</span>
                    </div>
                    Automatic payment calculation
                  </li>
                </ul>
                <Button
                  onClick={() => onSelectRole('recruiter')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
                  size="lg"
                >
                  Continue as Recruiter
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-3xl font-bold mb-1">50K+</p>
            <p className="text-sm text-muted-foreground">Active Workers</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Briefcase className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-3xl font-bold mb-1">10K+</p>
            <p className="text-sm text-muted-foreground">Jobs Posted</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-3xl font-bold mb-1">98%</p>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold mb-1">4.8</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose WEgo?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="mb-2">Location-Based</h4>
                <p className="text-sm text-muted-foreground">
                  Find jobs near you with our interactive India map
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="mb-2">Fair Pay</h4>
                <p className="text-sm text-muted-foreground">
                  Transparent pricing and automatic payment calculation
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="mb-2">Quick Hiring</h4>
                <p className="text-sm text-muted-foreground">
                  Post a job and get applications within minutes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm text-muted-foreground">
                Secure & Verified Platform
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 WEgo. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
