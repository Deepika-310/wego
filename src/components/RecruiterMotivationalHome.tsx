import { TrendingUp, Award, Clock, IndianRupee, Star, Users, Briefcase, CheckCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';

interface RecruiterMotivationalHomeProps {
  user: any;
  onViewPosts: () => void;
}

export function RecruiterMotivationalHome({ user, onViewPosts }: RecruiterMotivationalHomeProps) {
  const activeJobs = 8;
  const totalApplicants = 47;
  const monthlyBudget = 50000;
  const spent = 32500;
  const hiredThisMonth = 12;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
        
        <div className="relative z-10">
          <h2 className="mb-2">Welcome back, {user.name}! 👋</h2>
          <p className="text-white/90 mb-6">
            Your recruitment dashboard is looking great today.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="w-4 h-4" />
                <span className="text-white/80 text-sm">Active Jobs</span>
              </div>
              <p className="text-2xl font-bold">{activeJobs}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-white/80 text-sm">Applicants</span>
              </div>
              <p className="text-2xl font-bold">{totalApplicants}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4" />
                <span className="text-white/80 text-sm">Hired</span>
              </div>
              <p className="text-2xl font-bold">{hiredThisMonth}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4" />
                <span className="text-white/80 text-sm">Rating</span>
              </div>
              <p className="text-2xl font-bold">{user.rating}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onViewPosts}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl">→</span>
            </div>
            <h4 className="mb-1">View All Posts</h4>
            <p className="text-muted-foreground">{activeJobs} active job postings</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl">→</span>
            </div>
            <h4 className="mb-1">New Applicants</h4>
            <p className="text-muted-foreground">{totalApplicants} waiting for review</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl">→</span>
            </div>
            <h4 className="mb-1">Success Rate</h4>
            <p className="text-muted-foreground">85% positions filled</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="mb-1">Monthly Budget</h4>
                <p className="text-muted-foreground">
                  ₹{spent.toLocaleString('en-IN')} / ₹{monthlyBudget.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <Progress value={(spent / monthlyBudget) * 100} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              ₹{(monthlyBudget - spent).toLocaleString('en-IN')} remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="mb-1">This Month</h4>
                <p className="text-muted-foreground">
                  {hiredThisMonth} workers hired
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <Progress value={60} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              20% increase from last month 📈
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h4>Recent Activity</h4>
          </div>
          <div className="space-y-3">
            {[
              { action: 'New applicant for Warehouse Helper', time: '5 min ago', type: 'applicant' },
              { action: 'Sarah Johnson accepted your job offer', time: '1 hour ago', type: 'success' },
              { action: 'Delivery Driver job viewed 12 times', time: '2 hours ago', type: 'view' },
              { action: 'Completed payment for Event Staff job', time: '3 hours ago', type: 'payment' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p>{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'applicant' ? 'bg-blue-500' :
                  activity.type === 'payment' ? 'bg-purple-500' :
                  'bg-gray-400'
                }`} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pro Tips */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
              💡
            </div>
            <div>
              <h4 className="mb-2">Hiring Tip</h4>
              <p className="text-muted-foreground">
                Jobs with clear descriptions and competitive pay rates receive 50% more quality applications. 
                Consider adding specific requirements to attract the right candidates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
