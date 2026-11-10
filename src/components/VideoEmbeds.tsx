export function VimeoEmbed({ id, hash, aspect = 'aspect-video' }: { id: string; hash?: string; aspect?: string }) {
  const params = new URLSearchParams({ byline: '0', portrait: '0', title: '0', autopause: '0', color: 'c8bca6' });
  if (hash) params.set('h', hash);
  return (
    <div className={`${aspect} w-full overflow-hidden bg-black/10`}>
      <iframe
        src={`https://player.vimeo.com/video/${id}?${params.toString()}`}
        className="w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Vimeo video"
      />
    </div>
  );
}

export function YouTubeEmbed({ id }: { id: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden bg-black/10">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="YouTube video"
      />
    </div>
  );
}
