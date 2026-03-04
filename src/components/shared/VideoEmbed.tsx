interface VideoEmbedProps {
  src: string;
  title?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  className?: string;
}

export function VideoEmbed({
  src,
  title = 'Video',
  aspectRatio = '16:9',
  className = ''
}: VideoEmbedProps) {
  const aspectClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square'
  };

  // Convert YouTube watch URLs to embed URLs
  const embedSrc = src.includes('youtube.com/watch')
    ? src.replace('watch?v=', 'embed/')
    : src.includes('youtu.be/')
    ? src.replace('youtu.be/', 'youtube.com/embed/')
    : src;

  return (
    <div className={`relative ${aspectClasses[aspectRatio]} rounded-2xl overflow-hidden bg-bg-dark ${className}`}>
      <iframe
        src={embedSrc}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

interface VideoPlaceholderProps {
  title?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  className?: string;
  onPlay?: () => void;
}

export function VideoPlaceholder({
  title = 'Assistir vídeo',
  aspectRatio = '16:9',
  className = '',
  onPlay
}: VideoPlaceholderProps) {
  const aspectClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square'
  };

  return (
    <button
      onClick={onPlay}
      className={`relative ${aspectClasses[aspectRatio]} rounded-2xl overflow-hidden bg-bg-dark group ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-gold/90 group-hover:bg-gold flex items-center justify-center transition-colors">
          <svg className="w-8 h-8 text-bg-darker ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <span className="absolute bottom-4 left-4 text-text-light text-sm">{title}</span>
    </button>
  );
}
