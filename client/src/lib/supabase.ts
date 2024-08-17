import { createClient, PostgrestSingleResponse } from '@supabase/supabase-js'

import { Filters, Note } from 'src/types'
import { Database } from 'src/types/database.types'
import { SUPABASE_KEY, SUPABASE_URL } from 'src/utils/environment'

const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_KEY
)

export async function search (
  keyword: string,
  filters: Filters
): Promise<PostgrestSingleResponse<Note[]>> {
  const sortByLen = filters.sort === 'relevance' ? undefined : filters.sort === 'shortness'

  let query = supabase.rpc('search_sentences', { keyword })

  if (sortByLen !== undefined) { query = query.order('len', { ascending: sortByLen }) }

  if (filters.onlyTranslated) { query = query.gt('translation', 0) }

  return await query
}

export default supabase
