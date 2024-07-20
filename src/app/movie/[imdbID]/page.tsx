export default function Movie ({ params }: { params: { imdbID: string } }) {
  return (
    <div>
      <h1>Movie: {params.imdbID}</h1>
    </div>
  )
}
