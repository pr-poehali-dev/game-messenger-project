import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

interface User {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline' | 'ingame';
}

interface Channel {
  id: string;
  name: string;
  game: string;
  icon: string;
  members: number;
  color: string;
}

interface Friend {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline' | 'ingame';
  game?: string;
}

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedTab, setSelectedTab] = useState('channels');

  const channels: Channel[] = [
    { id: '1', name: 'Valorant Heroes', game: 'Valorant', icon: '🎯', members: 234, color: '#7C3AED' },
    { id: '2', name: 'CS2 Legends', game: 'CS2', icon: '🔫', members: 456, color: '#EF4444' },
    { id: '3', name: 'Dota 2 Arena', game: 'Dota 2', icon: '⚔️', members: 189, color: '#10B981' },
    { id: '4', name: 'League Champions', game: 'League of Legends', icon: '🏆', members: 567, color: '#7C3AED' },
    { id: '5', name: 'Fortnite Squad', game: 'Fortnite', icon: '🎮', members: 342, color: '#EF4444' },
  ];

  const friends: Friend[] = [
    { id: '1', username: 'ShadowGamer', avatar: '', status: 'online', game: 'Valorant' },
    { id: '2', username: 'ProPlayer99', avatar: '', status: 'ingame', game: 'CS2' },
    { id: '3', username: 'NinjaKill', avatar: '', status: 'online' },
    { id: '4', username: 'QueenOfGames', avatar: '', status: 'offline' },
    { id: '5', username: 'DragonSlayer', avatar: '', status: 'ingame', game: 'Dota 2' },
  ];

  const stats = {
    gamesPlayed: 1247,
    hoursPlayed: 3456,
    wins: 789,
    rank: 'Diamond II',
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setCurrentUser({
        id: '1',
        username: username,
        avatar: '',
        status: 'online',
      });
      setIsLoggedIn(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-accent';
      case 'ingame':
        return 'bg-secondary';
      case 'offline':
        return 'bg-muted-foreground';
      default:
        return 'bg-muted-foreground';
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 gradient-gaming opacity-30"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        
        <Card className="w-full max-w-md p-8 backdrop-blur-sm bg-card/80 border-2 border-primary/20 relative z-10">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎮</div>
            <h1 className="text-4xl font-bold mb-2 gradient-purple-red bg-clip-text text-transparent">
              GAMING MESSENGER
            </h1>
            <p className="text-muted-foreground">Подключайся к своей команде</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-muted border-border"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-muted border-border"
              />
            </div>
            <Button type="submit" className="w-full gradient-purple-red hover-glow text-lg font-semibold">
              Войти в игру
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button className="text-primary hover:underline text-sm">
              Создать аккаунт
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-20 bg-sidebar border-r border-border flex flex-col items-center py-6 space-y-6">
        <div className="w-12 h-12 rounded-full gradient-purple-red flex items-center justify-center text-2xl font-bold">
          {currentUser?.username.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-1 flex flex-col space-y-4">
          <button
            onClick={() => setSelectedTab('channels')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover-glow ${
              selectedTab === 'channels' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-primary/20'
            }`}
          >
            <Icon name="Hash" size={24} />
          </button>
          
          <button
            onClick={() => setSelectedTab('friends')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover-glow ${
              selectedTab === 'friends' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-primary/20'
            }`}
          >
            <Icon name="Users" size={24} />
          </button>
          
          <button
            onClick={() => setSelectedTab('profile')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover-glow ${
              selectedTab === 'profile' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-primary/20'
            }`}
          >
            <Icon name="User" size={24} />
          </button>
          
          <button
            onClick={() => setSelectedTab('stats')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover-glow ${
              selectedTab === 'stats' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-primary/20'
            }`}
          >
            <Icon name="BarChart3" size={24} />
          </button>
        </div>

        <button
          onClick={() => setIsLoggedIn(false)}
          className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center hover:bg-destructive/40 transition-all"
        >
          <Icon name="LogOut" size={20} />
        </button>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
          <h2 className="text-xl font-bold">
            {selectedTab === 'channels' && '🎮 Каналы'}
            {selectedTab === 'friends' && '👥 Друзья'}
            {selectedTab === 'profile' && '👤 Профиль'}
            {selectedTab === 'stats' && '📊 Статистика'}
          </h2>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-accent text-accent">
              <span className="w-2 h-2 rounded-full bg-accent mr-2"></span>
              В сети
            </Badge>
          </div>
        </header>

        <ScrollArea className="flex-1">
          <div className="p-6">
            {selectedTab === 'channels' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Игровые каналы</h3>
                    <p className="text-muted-foreground">Присоединяйся к командам</p>
                  </div>
                  <Button className="gradient-purple-red hover-glow">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Создать канал
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {channels.map((channel) => (
                    <Card
                      key={channel.id}
                      className="p-6 border-2 hover:border-primary/50 transition-all cursor-pointer hover-glow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                            style={{ backgroundColor: `${channel.color}20` }}
                          >
                            {channel.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{channel.name}</h4>
                            <p className="text-sm text-muted-foreground">{channel.game}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Users" size={16} />
                          <span>{channel.members} участников</span>
                        </div>
                        <Button
                          size="sm"
                          className="hover-glow"
                          style={{ backgroundColor: channel.color }}
                        >
                          Войти
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'friends' && (
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1">Список друзей</h3>
                  <p className="text-muted-foreground">Твоя игровая команда</p>
                </div>

                <div className="space-y-3">
                  {friends.map((friend) => (
                    <Card key={friend.id} className="p-4 hover:border-primary/50 transition-all hover-glow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Avatar className="w-12 h-12 border-2 border-primary">
                              <AvatarImage src={friend.avatar} />
                              <AvatarFallback className="bg-gradient-purple-red">
                                {friend.username.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span
                              className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-card ${getStatusColor(
                                friend.status
                              )}`}
                            ></span>
                          </div>
                          <div>
                            <h4 className="font-semibold">{friend.username}</h4>
                            <p className="text-sm text-muted-foreground">
                              {friend.status === 'ingame' && friend.game
                                ? `Играет в ${friend.game}`
                                : friend.status === 'online'
                                ? 'В сети'
                                : 'Не в сети'}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="outline" className="hover-glow">
                            <Icon name="MessageCircle" size={18} />
                          </Button>
                          <Button size="icon" variant="outline" className="hover-glow">
                            <Icon name="Phone" size={18} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'profile' && (
              <div className="max-w-2xl mx-auto space-y-6">
                <Card className="p-8 border-2 border-primary/20">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="relative">
                      <Avatar className="w-24 h-24 border-4 border-primary">
                        <AvatarFallback className="bg-gradient-purple-red text-3xl font-bold">
                          {currentUser?.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full border-4 border-card bg-accent"></span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-2">{currentUser?.username}</h3>
                      <Badge className="gradient-purple-red mb-4">
                        <Icon name="Trophy" size={16} className="mr-1" />
                        {stats.rank}
                      </Badge>
                      <p className="text-muted-foreground">
                        Профессиональный игрок • В команде с 2024
                      </p>
                    </div>
                    <Button variant="outline" className="hover-glow">
                      <Icon name="Settings" size={18} className="mr-2" />
                      Настройки
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 bg-muted/50">
                      <div className="text-sm text-muted-foreground mb-1">Игр сыграно</div>
                      <div className="text-2xl font-bold">{stats.gamesPlayed}</div>
                    </Card>
                    <Card className="p-4 bg-muted/50">
                      <div className="text-sm text-muted-foreground mb-1">Часов в игре</div>
                      <div className="text-2xl font-bold">{stats.hoursPlayed}</div>
                    </Card>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-primary/20">
                  <h4 className="font-bold text-lg mb-4">Любимые игры</h4>
                  <div className="space-y-3">
                    {['Valorant', 'CS2', 'Dota 2'].map((game, idx) => (
                      <div key={game} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="font-semibold">{game}</span>
                        <Badge variant="outline">{500 - idx * 50} часов</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {selectedTab === 'stats' && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1">Игровая статистика</h3>
                  <p className="text-muted-foreground">Твои достижения и прогресс</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="p-6 border-2 border-primary/20 hover-glow">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                        <Icon name="Gamepad2" size={24} className="text-primary" />
                      </div>
                      <div className="text-3xl font-bold mb-1">{stats.gamesPlayed}</div>
                      <div className="text-sm text-muted-foreground">Игр сыграно</div>
                    </div>
                  </Card>

                  <Card className="p-6 border-2 border-secondary/20 hover-glow">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-3">
                        <Icon name="Trophy" size={24} className="text-secondary" />
                      </div>
                      <div className="text-3xl font-bold mb-1">{stats.wins}</div>
                      <div className="text-sm text-muted-foreground">Побед</div>
                    </div>
                  </Card>

                  <Card className="p-6 border-2 border-accent/20 hover-glow">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
                        <Icon name="Clock" size={24} className="text-accent" />
                      </div>
                      <div className="text-3xl font-bold mb-1">{stats.hoursPlayed}</div>
                      <div className="text-sm text-muted-foreground">Часов в игре</div>
                    </div>
                  </Card>

                  <Card className="p-6 border-2 border-primary/20 hover-glow">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                        <Icon name="Target" size={24} className="text-primary" />
                      </div>
                      <div className="text-3xl font-bold mb-1">63%</div>
                      <div className="text-sm text-muted-foreground">Винрейт</div>
                    </div>
                  </Card>
                </div>

                <Card className="p-6 border-2 border-primary/20">
                  <h4 className="font-bold text-lg mb-6">Активность по играм</h4>
                  <div className="space-y-6">
                    {[
                      { game: 'Valorant', hours: 450, color: '#7C3AED', percentage: 100 },
                      { game: 'CS2', hours: 380, color: '#EF4444', percentage: 84 },
                      { game: 'Dota 2', hours: 320, color: '#10B981', percentage: 71 },
                      { game: 'League of Legends', hours: 280, color: '#7C3AED', percentage: 62 },
                    ].map((item) => (
                      <div key={item.game}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{item.game}</span>
                          <span className="text-sm text-muted-foreground">{item.hours} часов</span>
                        </div>
                        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${item.percentage}%`,
                              backgroundColor: item.color,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 border-2 border-primary/20">
                    <h4 className="font-bold text-lg mb-4">Последние достижения</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Первая кровь', icon: '🎯', date: 'Вчера' },
                        { name: 'Мастер эйса', icon: '⭐', date: '3 дня назад' },
                        { name: 'Невероятная серия', icon: '🔥', date: 'Неделю назад' },
                      ].map((achievement) => (
                        <div
                          key={achievement.name}
                          className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover-glow"
                        >
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <div className="font-semibold">{achievement.name}</div>
                            <div className="text-xs text-muted-foreground">{achievement.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6 border-2 border-primary/20">
                    <h4 className="font-bold text-lg mb-4">Ближайшие турниры</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Valorant Cup', date: '15 октября', prize: '10,000₽' },
                        { name: 'CS2 Masters', date: '22 октября', prize: '25,000₽' },
                        { name: 'Dota 2 League', date: '5 ноября', prize: '50,000₽' },
                      ].map((tournament) => (
                        <div
                          key={tournament.name}
                          className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover-glow"
                        >
                          <div>
                            <div className="font-semibold">{tournament.name}</div>
                            <div className="text-xs text-muted-foreground">{tournament.date}</div>
                          </div>
                          <Badge className="gradient-purple-red">{tournament.prize}</Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
