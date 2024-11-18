import { createClient } from '@supabase/supabase-js'

const URL = 'https://mrkdlhprdsbxivnwlsjc.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ya2RsaHByZHNieGl2bndsc2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNDc1OTUsImV4cCI6MjA0NjkyMzU5NX0.nv2_3BZkDyrE9y5POHl0X0vS5kdAqcc4gdIm4qYm450';

export const supabase = createClient(URL, API_KEY);
