export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
export const IMAGE_500 = (posterPath: string) =>
  posterPath ? `${IMAGE_BASE_URL}/w500${posterPath}` : null;
export const IMAGE_342 = (posterPath: string) =>
  posterPath ? `${IMAGE_BASE_URL}/w342${posterPath}` : null;
export const IMAGE_185 = (posterPath: string) =>
  posterPath ? `${IMAGE_BASE_URL}/w185${posterPath}` : null;

export const FALLBACK_MOVIE_POSTER =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const FALLBACK_PERSON_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";
