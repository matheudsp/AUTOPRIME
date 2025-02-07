export { };
 
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin" | "moderator";
    };
  }
}

declare module "@splidejs/react-splide" {
  export { Options } from "@splidejs/splide";
  export { Splide, SplideSlide } from "@splidejs/react-splide";
}