import AppShell from '@/components/layouts/AppShell/AppShell';
import MovieDetailPage from '@/components/Movies/Detail/MovieDetailPage';
import CommentBox from '@/components/Comment/CommentBox';
import Loading from '@/components/Loading/Loading';
import { supabase } from '@/db/supabaseClient';
import { Suspense } from 'react';

// ========== COMMENTS CONTENT ==========
const CommentsContent = async ({ movieId }: { movieId: string }) => {
  const { data: commentsData, error } = await supabase
    .from('comments')
    .select('*')
    .eq('movie_id', movieId)
    .order('created_at', { ascending: false });

  if (error) console.error(error);

  return <CommentBox movieId={movieId} commentsData={commentsData ?? []} />;
};

// ========== MOVIE DETAIL PAGE ==========
const MovieDetail = async ({ params }: { params: { movieId: string } }) => {
  const movieId = params.movieId;

  const { data: movie, error } = await supabase
    .from('movies')
    .select(`
      id,
      created_at,
      title,
      year,
      rating,
      poster_url,
      description,
      director,
      genre,
      actors_id,
      genres_id
    `)
    .eq('id', movieId)
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  // Ensure genre is an array (if not, fallback to empty array)
  const movieData = {
    ...movie,
    genre: Array.isArray(movie.genre) ? movie.genre : (movie.genre ? [movie.genre] : []),
  };

  return (
    <AppShell>
      <Suspense fallback={<Loading />}>
        <MovieDetailPage movie={movieData} />
      </Suspense>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Comments</h2>

        <Suspense fallback={<Loading />}>
          <CommentsContent movieId={movieId} />
        </Suspense>
      </section>
    </AppShell>
  );
};

export default MovieDetail;
