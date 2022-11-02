package com.example.fishid;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.Toast;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.navigation.NavigationBarView;

public class MainActivity extends AppCompatActivity {
    private BottomNavigationView bottomNavigationView; //바텀 네비게이션 뷰 선언
    private FragmentManager fm;
    private FragmentTransaction ft;
    private Frag1 frag1;
    private Frag2 frag2;
    private Frag3 frag3;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        frag1 = new Frag1();
        frag2 = new Frag2();
        frag3 = new Frag3();


        bottomNavigationView = findViewById(R.id.bottomNavi);
        bottomNavigationView.setOnItemSelectedListener(new BottomNavigationView.OnItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {

                switch (menuItem.getItemId()) {
                    case R.id.action_chat:
                        setFrag(0);
                        break;
                    case R.id.action_camera:
                        setFrag(1);
                        break;
                    case R.id.action_map:
                        setFrag(2);
                        break;
                }
                return true;
            }
        });


        setFrag(0); //최초 fragment 화면 선택

    }

    private void setFrag(int n) {
        fm = getSupportFragmentManager();
        ft = fm.beginTransaction();
        switch (n) { //fragment 교체가 일어나는 실행문문
            case 0:
                Toast.makeText(MainActivity.this, "게시판", Toast.LENGTH_SHORT).show();
                ft.replace(R.id.main_frame, frag1);
                ft.commit();
                break;

            case 1:
                Toast.makeText(MainActivity.this, "2번", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(MainActivity.this, CameraActivity.class);
                startActivity(intent);
                break;
            case 2:

                ft.replace(R.id.main_frame, frag3);
                ft.commit();
                Toast.makeText(MainActivity.this, "지도", Toast.LENGTH_SHORT).show();
                break;


        }


    }
}



