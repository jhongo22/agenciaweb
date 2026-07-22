'use client';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    window.location.href = 'https://wa.me/573004435894?text=Hello%20Autonomek%2C%20I%20would%20like%20to%20start%20a%20project.';
  }, []);

  return null;
}
