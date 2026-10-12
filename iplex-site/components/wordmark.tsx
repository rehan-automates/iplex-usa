import Link from "next/link";

export function Wordmark() {
  return (
    <Link className="wordmark" href="/" aria-label="iPlex home">
      <span className="text-emerald-600">i</span>Plex
    </Link>
  );
}
