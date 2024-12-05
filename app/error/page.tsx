import React from 'react';

const ErrorPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Fehler</h1>
      <p>Das hätte nicht passieren sollen.</p>
      <p className="text-red-600 font-bold text-lg mt-3">
        {searchParams?.error}
      </p>
    </div>
  );
};

export default ErrorPage;
