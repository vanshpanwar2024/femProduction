import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth';

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const payload = await decrypt(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await request.json();
    
    if (!supabase) return NextResponse.json({ error: "Database not connected" }, { status: 500 });
    
    const { error } = await supabase
      .from('profiles')
      .update({ status })
      .eq('id', id);

    if (error) {
      if (error.message.includes('column "status" of relation "profiles" does not exist')) {
         return NextResponse.json({ error: "Please add a 'status' text column to your 'profiles' table in Supabase to use this feature!" }, { status: 400 });
      }
      throw error;
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}