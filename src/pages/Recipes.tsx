import React, { useState } from 'react';
import { Search, Filter, Heart, Clock, Users, Star, ChefHat, BookOpen } from 'lucide-react';
import { Recipe } from '../types';

const Recipes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  // 샘플 레시피 데이터
  const sampleRecipes: Recipe[] = [
    {
      id: '1',
      name: '닭가슴살 샐러드',
      description: '신선한 채소와 단백질이 풍부한 닭가슴살 샐러드',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      prepTime: 15,
      cookTime: 10,
      servings: 1,
      difficulty: 'easy',
      tags: ['샐러드', '단백질', '다이어트', '아침식사'],
      ingredients: [],
      instructions: [],
      nutrition: { calories: 250, protein: 30, carbs: 15, fat: 8, fiber: 5, sugar: 3, sodium: 400 },
      isFavorite: false
    },
    {
      id: '2',
      name: '오트밀 아침식사',
      description: '건강한 오트밀과 과일로 만드는 아침식사',
      image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400',
      prepTime: 5,
      cookTime: 5,
      servings: 1,
      difficulty: 'easy',
      tags: ['아침식사', '오트밀', '건강식', '빠른요리'],
      ingredients: [],
      instructions: [],
      nutrition: { calories: 180, protein: 6, carbs: 30, fat: 3, fiber: 4, sugar: 12, sodium: 50 },
      isFavorite: true
    },
    {
      id: '3',
      name: '연어 구이',
      description: '오메가3가 풍부한 연어를 간단하게 구워내는 요리',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
      prepTime: 10,
      cookTime: 15,
      servings: 1,
      difficulty: 'medium',
      tags: ['생선', '단백질', '오메가3', '저탄수화물'],
      ingredients: [],
      instructions: [],
      nutrition: { calories: 320, protein: 35, carbs: 5, fat: 18, fiber: 2, sugar: 1, sodium: 350 },
      isFavorite: false
    },
    {
      id: '4',
      name: '퀴노아 볼',
      description: '슈퍼푸드 퀴노아와 채소로 만드는 건강한 한끼',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      prepTime: 20,
      cookTime: 25,
      servings: 1,
      difficulty: 'medium',
      tags: ['퀴노아', '채식', '건강식', '점심식사'],
      ingredients: [],
      instructions: [],
      nutrition: { calories: 280, protein: 12, carbs: 45, fat: 6, fiber: 8, sugar: 4, sodium: 200 },
      isFavorite: true
    },
    {
      id: '5',
      name: '치킨 스테이크',
      description: '닭가슴살을 부드럽게 조리한 단백질 풍부한 스테이크',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
      prepTime: 15,
      cookTime: 20,
      servings: 1,
      difficulty: 'medium',
      tags: ['닭고기', '단백질', '저지방', '저녁식사'],
      ingredients: [],
      instructions: [],
      nutrition: { calories: 290, protein: 38, carbs: 8, fat: 12, fiber: 3, sugar: 2, sodium: 450 },
      isFavorite: false
    },
    {
      id: '6',
      name: '아보카도 토스트',
      description: '크림치즈와 아보카도로 만드는 간단한 아침 토스트',
      image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400',
      prepTime: 8,
      cookTime: 5,
      servings: 1,
      difficulty: 'easy',
      tags: ['토스트', '아보카도', '아침식사', '빠른요리'],
      ingredients: [],
      instructions: [],
      nutrition: { calories: 220, protein: 8, carbs: 25, fat: 12, fiber: 6, sugar: 3, sodium: 380 },
      isFavorite: true
    }
  ];

  const difficulties = [
    { value: 'all', label: '전체', color: 'bg-gray-100 text-gray-700' },
    { value: 'easy', label: '초급', color: 'bg-green-100 text-green-700' },
    { value: 'medium', label: '중급', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'hard', label: '고급', color: 'bg-red-100 text-red-700' }
  ];

  const allTags = Array.from(new Set(sampleRecipes.flatMap(recipe => recipe.tags)));

  const filteredRecipes = sampleRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => recipe.tags.includes(tag));
    const matchesFavorites = !favoritesOnly || recipe.isFavorite;
    
    return matchesSearch && matchesDifficulty && matchesTags && matchesFavorites;
  });

  const toggleFavorite = (recipeId: string) => {
    // 실제로는 API 호출로 즐겨찾기 상태를 변경
    console.log('Toggle favorite:', recipeId);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getDifficultyLabel = (difficulty: string) => {
    return difficulties.find(d => d.value === difficulty)?.label || difficulty;
  };

  const getDifficultyColor = (difficulty: string) => {
    return difficulties.find(d => d.value === difficulty)?.color || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">레시피 찾기</h1>
        <p className="text-gray-600">500개 이상의 1인분 맞춤 레시피를 찾아보세요</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="레시피 이름이나 재료로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 text-lg"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">난이도</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty.value}
                    onClick={() => setSelectedDifficulty(difficulty.value)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedDifficulty === difficulty.value
                        ? 'bg-indigo-600 text-white'
                        : difficulty.color + ' hover:bg-gray-200'
                    }`}
                  >
                    {difficulty.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">태그</label>
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Favorites Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">즐겨찾기</label>
              <button
                onClick={() => setFavoritesOnly(!favoritesOnly)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  favoritesOnly
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 inline mr-2 ${favoritesOnly ? 'fill-current' : ''}`} />
                즐겨찾기만
              </button>
            </div>

            {/* Clear Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">필터 초기화</label>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDifficulty('all');
                  setSelectedTags([]);
                  setFavoritesOnly(false);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span className="text-gray-600">
            총 <span className="font-semibold text-gray-900">{filteredRecipes.length}</span>개의 레시피
          </span>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="card hover:scale-105 transition-transform cursor-pointer">
            {/* Recipe Image */}
            <div className="relative mb-4">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(recipe.id);
                }}
                className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                  recipe.isFavorite
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${recipe.isFavorite ? 'fill-current' : ''}`} />
              </button>
              <div className="absolute bottom-3 left-3">
                <span className={`badge ${getDifficultyColor(recipe.difficulty)}`}>
                  {getDifficultyLabel(recipe.difficulty)}
                </span>
              </div>
            </div>

            {/* Recipe Info */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                {recipe.name}
              </h3>
              
              <p className="text-gray-600 text-sm line-clamp-2">
                {recipe.description}
              </p>

              {/* Recipe Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.prepTime + recipe.cookTime}분</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{recipe.servings}인분</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>{recipe.nutrition.calories}kcal</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {recipe.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="badge badge-primary text-xs">
                    {tag}
                  </span>
                ))}
                {recipe.tags.length > 3 && (
                  <span className="badge badge-secondary text-xs">
                    +{recipe.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-600 mb-4">
            검색 조건을 변경하거나 필터를 초기화해보세요.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDifficulty('all');
              setSelectedTags([]);
              setFavoritesOnly(false);
            }}
            className="btn btn-primary"
          >
            필터 초기화
          </button>
        </div>
      )}
    </div>
  );
};

export default Recipes;
