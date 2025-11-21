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
  const movieId = params.movieId; // ❗Tidak perlu await

  const { data: movie, error } = await supabase
    .from('movies')
    .select(
      `
      id,
      title,
      year,
      rating,
      poster_url,
      description,
      director,
      mov_genre (
        genre_id,
        genre(name)
      ),
      mov_actor (
        actor_id,
        actor(name)
      )
      `
    )
    .eq('id', movieId)
    .single(); // ❗Supaya dapat 1 object, bukan array

  if (error) {
    console.error(error);
    throw error;
  }

  return (
    <AppShell>
      <Suspense fallback={<Loading />}>
        <MovieDetailPage movie={movie} />
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


  return (
    <AppShell>
      <MovieDetailPage movie={movie[0]} />
      <Suspense fallback={Loading()}>
        <CommentsContent movieId={movieId} />
      </Suspense>
    </AppShell>
  );
};

export default MovieDetail;
