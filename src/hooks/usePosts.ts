import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
const fetchPosts =  (id: number | undefined) => {
    return axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts', 
    {params: {
        userId: id}
    })
    .then(res => res.data)

};

const usePosts = (id: number | undefined) => {
    return useQuery<Post[], Error>({
            queryKey: id? ["users", id, "posts"] : ["posts"],
            queryFn: () =>fetchPosts(id),
            staleTime: 1000 * 60, // 1 minute
    });
}

export default usePosts