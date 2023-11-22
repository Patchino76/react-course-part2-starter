import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }

interface PostQuery {
    pageSize: number;
    page: number;
}
const fetchPosts =  (query:PostQuery) => {
    return axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts', 
    {params: {
        _start: (query.page -1) * query.pageSize,
        _limit: query.pageSize
    }
    })
    .then(res => res.data)

};

const usePosts = (query:PostQuery) => {
    return useQuery<Post[], Error>({
            queryKey: ['posts', query],
            queryFn: () =>fetchPosts(query),
            staleTime: 1000 * 60, // 1 minute

    });
}

export default usePosts