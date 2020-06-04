import { useQuery } from 'react-query';
import  * as socialmedia from 'api/taskmanager';

const fiveMinutes = 1000 * 60 * 5;

export function useAuth(){
  const { data, status } = useQuery('me', socialmedia.getMe, {
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: fiveMinutes,
  });
   
  return {
    user: data,
    isAuthenticated: !!data,
    isLoading: status === 'loading',
  };
    
}
