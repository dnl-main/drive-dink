import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 font-sans">
      <div className="text-center">
        <div className="font-display text-8xl text-primary">404</div>
        <p className="mt-2 text-muted-foreground">This page rolled out of bounds.</p>
        <Link to="/" className="mt-6 inline-block rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          Back to home
        </Link>
      </div>
    </div>
  );
}