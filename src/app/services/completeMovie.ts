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
    const json = await response.json()
    if (json.Response === 'False') {
      throw new Error(json.Error)
    }
    if (json.error?.length > 0) {
      throw new Error(json.error)
    }
    return json
  } catch (error) {
    return { error: true, message: (error as Error).message }
  }
}
