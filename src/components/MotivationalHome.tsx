import { TrendingUp, Award, Clock, DollarSign, Star, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';

interface MotivationalHomeProps {
  user: any;
}

export function MotivationalHome({ user }: MotivationalHomeProps) {
  const weeklyGoal = 40; // hours
  const currentHours = 27;
  const earnings = 4855;
  const weeklyEarningsGoal = 6000;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
        
        <div className="relative z-10">
          <h2 className="mb-2">Welcome back, {user.name}! 👋</h2>
          <p className="text-white/90 mb-6">
            You're doing great! Let's make today productive.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4" />
                <span className="text-white/80 text-sm">Rating</span>
              </div>
              <p className="text-2xl font-bold">{user.rating}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-white/80 text-sm">Jobs Done</span>
              </div>
              <p className="text-2xl font-bold">23</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-white/80 text-sm">This Week</span>
              </div>
              <p className="text-2xl font-bold">₹{earnings}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-white/80 text-sm">Hours</span>
              </div>
              <p className="text-2xl font-bold">{currentHours}h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="mb-1">Weekly Hours Goal</h4>
                <p className="text-muted-foreground">
                  {currentHours} / {weeklyGoal} hours
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <Progress value={(currentHours / weeklyGoal) * 100} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {weeklyGoal - currentHours} hours to go! 💪
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="mb-1">Earnings Goal</h4>
                <p className="text-muted-foreground">
                  ₹{earnings.toLocaleString('en-IN')} / ₹{weeklyEarningsGoal.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <Progress value={(earnings / weeklyEarningsGoal) * 100} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              ₹{(weeklyEarningsGoal - earnings).toLocaleString('en-IN')} away from your goal! 🎯
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-yellow-600" />
            <h4>Recent Achievements</h4>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center">
                🏆
              </div>
              <div>
                <p className="font-medium">5-Star Streak</p>
                <p className="text-sm text-muted-foreground">10 consecutive jobs</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                ⚡
              </div>
              <div>
                <p className="font-medium">Fast Responder</p>
                <p className="text-sm text-muted-foreground">Reply within 1 hour</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                💯
              </div>
              <div>
                <p className="font-medium">Reliable Worker</p>
                <p className="text-sm text-muted-foreground">100% completion</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="bg-gradient-to-br from-orange-50 to-pink-50 border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center flex-shrink-0">
              💡
            </div>
            <div>
              <h4 className="mb-2">Pro Tip of the Day</h4>
              <p className="text-muted-foreground">
                Workers who respond to job offers within 30 minutes are 3x more likely to get hired. 
                Keep notifications on to never miss an opportunity!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
