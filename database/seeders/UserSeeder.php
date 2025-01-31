<?php
namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        $users = [
            ["3374106702920003", "Puspita Karisma Kurniasani, M.Ars"],
            ["3302221205770003", "Aan Pratomo Setiadi, S.H, M.H"],
            ["3374096210970001", "Nuriyana Muthia Sani, M. Si"],
            ["3374064603970002", "Galuh Ajeng Candra Kirana, S.Psi"],
            ["3320030705940001", "Muhammad Taqyuddin, S.Pd"],
            ["3374073105920001", "Hardian Adi Pratama, S.Kom"],
            ["3321031402960001", "Irfan Abidin, S.T"],
            ["3374136804950001", "Agnes Anggi Dewanti, S.Ars, M.Ars"],
            ["3374036311950001", "Yosiana Ovi Sanola, S.Arch"],
            ["3317092301940002", "Novian Gagah Raino, S.T"],
            ["3374020705800001", "Wahyu Ardiyanto Kurniawan, S.E"],
            ["3374116612950003", "Destya Kusuma Dewi, S.IP"],
            ["3374065512830003", "Dessy Dini Susanti, S.E"],
            ["3374115901970004", "El Sifa Mega Biruni, S.PWK"],
            ["3174019201951001", "Nurillah Fajri, S.AK"],
            ["3374156405980002", "Rosiana Ayu Herwinda, S.S"],
            ["3374070409230004", "Hasyim Rafsanjani Hasibuan, S.Kom"],
            ["3374101807970004", "Kevin Satria Wibowo, S.Kom"],
            ["3374115509990004", "Galuh Punjung Andhani, S.Tr.A.B"],
            ["3376045707950001", "Ismiati Nur Istiqomah, S.IP, MPA"],
            ["3374105003000004", "Golden Rahmah Al-Mukarohmah, S.Tr.A.B"],
            ["3578154707990003", "Dyah Pramesthi Puspasakina, S.H"],
            ["3374110809630004", "Sumanto, S.ST"],
            ["3374065609860001", "Ade Kurnia Septiawati, A.Md"],
            ["1217025707950001", "Labbra Pasaribu, S.M"],
            ["3519014207010001", "Diar Nilam Kamilia Setiyono, A.Md"],
            ["3374165207990004", "Nandha Zulyana Eka Saputri, S.Tr.E"],
            ["3374095309950001", "Firstynina Cheppy Alfia .R., A.Md."],
            ["3174036107980005", "Nabillah, S.IKom"],
            ["3374094110740002", "Ratih Sri Wuriastuti, S.T"],
            ["3276055002950002", "dr. Sabrina Andiani K"],
            ["3315126010920005", "Nofiana, S.Kep, Ners"],
            ["3305125902010004", "Anis Sulitstianingsih, S.T"],
            ["3320032803980002", "Muhammad Nafis Sidiq, S.T"],
            ["3374064305990002", "Rahmatia Sarah Wahyudi, S.T.,M.T"],
            ["3374025908010001", "Annisa Nikki Imana, A.Md.T"],
            ["3503110101020001", "Arwidya Mahendra Nugraha, A.Md.T"],
            ["3374115405020002", "Syarifah Rosma Sahara, A.Md.T"],
            ["3310024512010001", "Dyah Ayu Fatimah Cahyaningtya, A.Md.T"],
            ["3404062412000001", "Imam Hasanudin, S.IP"],
            ["3374065308990005", "Lutfiana Kaja Iriani Pudjono, S.Tr.A.B"],
            ["3374064112970002", "Wanda Rosaliana Toqwin, S.E"],
            ["3374042809880002", "Taufan Edy Susilo, S.E"],
            ["3374115101860001", "Maria Anastasia Wendha Ghama Saputri Braminia, S.T"],
            ["3374155606840004", "Iin Wulan Suci Ramadani, S.T"],
            ["7371090411980002", "Aiy Arafat, S.T"],
            ["3302266203000003", "Adinda Dwianaputri Adiningtyas, S.T"],
            ["3309056305019002", "Damaris Anggun Sasmita, S.T"],
            ["3374126807000002", "Aulia Lutfi Anmanfa Lutfia, S.Tr.T"],
            ["3374102105870003", "Slamet Riyanto"],
            ["3374102607740001", "Edi Sutoto"],
            ["3309056305019000", "Didy Suryadinata, S.Sos"],
            ["3374060208950003", "Lutfi Fahmi Asror, S.E"]
        ];

        $datebirth = [
            "27021992",
            "12051977",
            "22101997",
            "06031997",
            "07051994",
            "31051992",
            "14021996",
            "28041995",
            "23111995",
            "23011994",
            "07051990",
            "26121995",
            "15121983",
            "19011997",
            "12011997",
            "24051998",
            "23101995",
            "18071992",
            "15091999",
            "17071995",
            "10032000",
            "07071999",
            "08091963",
            "16091986",
            "17071995",
            "02072001",
            "12071999",
            "13091995",
            "21071998",
            "01101974",
            "10021995",
            "20101992",
            "19022001",
            "28031998",
            "03051999",
            "19082001",
            "01012002",
            "14052002",
            "05122001",
            "24122000",
            "13081999",
            "01121997",
            "28091988",
            "11011986",
            "16061984",
            "04111998",
            "22032000",
            "23052001",
            "28072000",
            "21051987",
            "26071974",
            "28101969",
            "02081995"
        ];


        $i = 0;

        foreach ($users as $user) {
            $nameParts = explode(' ', $user[1]);
            if (strtolower($nameParts[0]) === 'dr.') {
                array_shift($nameParts);
            }

            //check if namepars[0] ended with , then remove it
            if (substr($nameParts[0], -1) === ',') {
                $nameParts[0] = substr($nameParts[0], 0, -1);
            }
            $email = strtolower($nameParts[0]).$datebirth[$i] . '@gmail.com';
            
            DB::table('users')->insert([
                'nik' => $user[0],
                'name' => $user[1],
                'email' => $email,
                'password' => Hash::make($user[0]),
                'role' => 'pegawai',
                'shift' => 1,
                'path_foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $i++;
        }


        //make insert for admin
        DB::table('users')->insert([
            'nik' => '1234567890123456',
            'name' => 'Admin Kepegawaian PPU',
            'email' => 'kepegawaianppu@gmail.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'shift' => null,
            'path_foto' => null,
        ]);
    }
}
