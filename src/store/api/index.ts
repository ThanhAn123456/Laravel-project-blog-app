import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { token } from "../../store/slice/auth";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders: (headers, { getState }) => {
      const state: any = getState();
      const accessToken = state.auth.access_token;

      headers.set("Content-Type", "application/json");

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Category", "Product", "User", "Follow", "Post"],
  endpoints: () => ({}),
});



// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { token } from "../../store/slice/auth";

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: async (args, api, extraOptions) => {
//     const baseQuery = fetchBaseQuery({
//       baseUrl: "http://127.0.0.1:8000/api",
//       credentials: "include", // Cho phép gửi cookie
//       prepareHeaders: (headers) => {
//         headers.set("Content-Type", "application/json");

//         // // Thêm token CSRF vào header
//         // const csrfToken = document.cookie
//         //   .split("; ")
//         //   .find((row) => row.startsWith("XSRF-TOKEN="))
//         //   ?.split("=")[1];
//         // if (csrfToken) {
//         //   headers.set("X-XSRF-TOKEN", decodeURIComponent(csrfToken));
//         // }

//         if (token) {
//           headers.set("authorization", `Bearer ${token}`);
//         }

//         return headers;
//       },
//     });

//     // Lấy CSRF token trước khi gửi request
//     const csrfResponse = await fetch(
//       "http://127.0.0.1:8000/sanctum/csrf-cookie",
//       {
//         credentials: "include",
//       }
//     );

//     if (!csrfResponse.ok) {
//       console.error("Failed to fetch CSRF token.");
//       return {
//         error: { status: csrfResponse.status, data: "CSRF token fetch failed" },
//       };
//     }

//     // Tiếp tục xử lý request gốc
//     return baseQuery(args, api, extraOptions);
//   },
//   tagTypes: ["Category", "Product", "User"],
//   endpoints: () => ({}),
// });

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { token } from "../../store/slice/auth";
// import { getCookie } from "typescript-cookie";

// const tokenResponse = await $fetch(config.baseURL + "/sanctum/csrf-cookie", {
//   method: "GET",
//   credentials: "include",
// });

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://127.0.0.1:8000/api",
//     credentials: "include", // Để gửi và nhận cookie

//     prepareHeaders: (headers) => {
//       // Set mặc định Content-Type cho tất cả các request
//       headers.set("Content-Type", "application/json");

//       // Lấy CSRF token từ cookie và thêm vào header nếu có
//       const csrfToken = getCookie("XSRF-TOKEN");

//       console.log("csrfToken: ", csrfToken);

//       if (csrfToken) {
//         // Đảm bảo rằng CSRF token đã được giải mã
//         headers.set("X-XSRF-TOKEN", decodeURIComponent(csrfToken));
//         headers.set("X-Requested-With", "XMLHttpRequest");
//         headers.set("Accept", "application/json, text/plain, */*");
//       }

//       // Nếu có token, thêm vào header Authorization
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }

//       return headers;
//     },
//   }),

//   tagTypes: ["Category", "Product", "User"],
//   endpoints: () => ({}),
// });
