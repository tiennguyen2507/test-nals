import BlogsPage from "@/views/BlogPage";
import { Navigate } from "react-router-dom";
import DetailBlogPage from '@/views/BlogPage/DetailBlogPage'

const routesConfig = [
  {
    path: '/',
    element: <Navigate to="/blogs" />,
  },
  {
    path: 'blogs',
    element: <BlogsPage />,
  },
  {
    path: 'blogs/detail/:id',
    element: <DetailBlogPage />,
  },
  {
    path: 'blogs/:id',
    element: <BlogsPage />,
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];

export default routesConfig;
