export async function getCompleteMovie ({
  id,
  title,
  year
}: {
  id?: string
  title?: string
  year?: string
}
) {
  try {
    if (
      (id === undefined || id === '' || id === null) &&
      (title === undefined ||
        title === '' ||
        title === null ||
        year === undefined ||
        year === '' ||
        year === null)
    ) {
      throw new Error('No movie to search')
    }
    let response
    if (id === undefined || id === '' || id === null) {
      response = await fetch('/api/movie?t=' + title + '&y=' + year)
    } else {
      response = await fetch('/api/movie?i=' + id)
    }
    const data = await response.json()
    if (data.Response === 'False') {
      throw new Error(data.error)
    }
    return data
  } catch (error) {
    return { error: true, message: (error as Error).message }
  }
}
