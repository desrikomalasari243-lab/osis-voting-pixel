"use server";

import { createClient } from "@/utils/supabase/server";

// =========================================================
// 1. FUNGSI LOGIN SISWA (OTP / PIN) - Mockup untuk Testing
// =========================================================
export async function verifyVoterPin(pin: string) {
  // Simulasi jeda jaringan selama 1.5 detik
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulasi logika database: Anggap "123456" adalah PIN yang benar
  if (pin === "123456") {
    return { success: true };
  }

  // Jika PIN selain 123456, kembalikan pesan error
  return {
    success: false,
    error: "PIN tidak terdaftar atau sudah digunakan. Silakan cek kembali.",
  };
}

// =========================================================
// 2. FUNGSI LOGIN ADMIN (Email + Password)
// =========================================================
export async function loginAdmin(formData: FormData) {
  const email = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email dan password wajib diisi." };
  }

  try {
    const supabase = await createClient();

    // 1. Autentikasi akun ke Supabase Auth
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      return {
        success: false,
        error: "Kredensial salah atau akun tidak ditemukan.",
      };
    }

    // 2. Otorisasi: Periksa apakah user ID ini ada di tabel 'admins'
    const { data: adminData, error: adminError } = await supabase
      .from("admins")
      .select("role")
      .eq("id", authData.user.id)
      .single();

    if (adminError || !adminData) {
      // Jika tidak terdaftar di tabel admin, paksa logout demi keamanan
      await supabase.auth.signOut();
      return {
        success: false,
        error: "Akses ditolak. Anda bukan administrator resmi.",
      };
    }

    return { success: true, role: adminData.role };
  } catch (err) {
    console.error("Kesalahan sistem saat login admin:", err);
    return {
      success: false,
      error: "Terjadi kesalahan internal pada server.",
    };
  }
}

// =========================================================
// 3. FUNGSI LOGOUT ADMIN
// =========================================================
export async function logoutAdmin() {
  try {
    const supabase = await createClient();
    // Memerintahkan Supabase untuk menghapus sesi aktif
    await supabase.auth.signOut();
    return { success: true };
  } catch (err) {
    console.error("Kesalahan sistem saat logout:", err);
    return { success: false, error: "Gagal melakukan logout." };
  }
}