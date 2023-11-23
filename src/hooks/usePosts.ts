import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }

interface PostQuery {
    pageSize: number;
}
// const fetchPosts =  (query: PostQuery, {pageParam = 1}: {pageParam?: number}) => {
//     return axios
//     .get<Post[]>('https://jsonplaceholder.typicode.com/posts', 
//     {params: {
//         _start: (pageParam -1) * query.pageSize,
//         _limit: query.pageSize
//     }
//     })
//     .then(res => res.data)

// };

const usePosts = (query: PostQuery) => {
  return useInfiniteQuery<Post[], Error>({
    queryKey: ['posts', query],
    queryFn: ({pageParam = 1}) => axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts', 
    {params: {
        _start: (pageParam -1) * query.pageSize,
        _limit: query.pageSize
    }
    })
    .then(res => res.data),
    staleTime: 1000 * 60, // 1 minute
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1
  });
};

export default usePosts