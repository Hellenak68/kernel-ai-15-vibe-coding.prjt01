import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChefHat, ShoppingCart, TrendingUp, Clock, Users, Star } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: '주간 맞춤 레시피',
      description: 'AI가 추천하는 1주일치 맞춤 레시피로 식단 계획 시간을 50% 단축',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: ChefHat,
      title: '1인분 정확한 분량',
      description: '모든 레시피가 1인분 기준으로 정확한 재료 분량과 조리법 제공',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: ShoppingCart,
      title: '스마트 장보기 리스트',
      description: '주간 레시피에 필요한 재료를 자동으로 정리한 장보기 리스트',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: TrendingUp,
      title: '영양 정보 트래킹',
      description: '일일 칼로리와 영양 성분을 한눈에 확인하고 관리',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const stats = [
    { label: '레시피 수', value: '500+', icon: ChefHat },
    { label: '사용자 만족도', value: '98%', icon: Star },
    { label: '시간 절약', value: '50%+', icon: Clock },
    { label: '1인 가구', value: '1000+', icon: Users }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            오늘 뭐 먹을지 고민하지 마세요
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            1인 가구를 위한 주간 맞춤 레시피 추천 서비스로<br />
            식단 계획부터 장보기까지 한 번에 해결하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/weekly-plan"
              className="btn btn-primary text-lg px-8 py-4 hover:scale-105 transition-transform"
            >
              주간 레시피 시작하기
            </Link>
            <Link
              to="/recipes"
              className="btn btn-outline text-lg px-8 py-4 hover:scale-105 transition-transform"
            >
              레시피 둘러보기
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              왜 레시피플래너인가요?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              1인 가구의 고민을 해결하는 핵심 기능들을 만나보세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card hover:scale-105 transition-transform">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            지금 바로 시작해보세요
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            무료로 제공되는 모든 기능을 체험해보고, 
            더 이상 '오늘 뭐 먹을지' 고민하지 마세요
          </p>
          <Link
            to="/weekly-plan"
            className="btn bg-white text-indigo-600 text-lg px-8 py-4 hover:bg-gray-100 hover:scale-105 transition-transform"
          >
            무료로 시작하기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
