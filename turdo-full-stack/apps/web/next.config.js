/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites:()=>{
        return[
            {
                source:'/trpc/:path*',
                destination: "http://localhost:3000/trpc/:path*", 
            },
        ];
    },
};

export default nextConfig;
