package com.example.fishid;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class RegisterActivity extends AppCompatActivity {


    private FirebaseAuth mFirebaseAuth;                     // 파이어베이스 인증
    private DatabaseReference mDatabaseRef;                 // 실시간 데이터베이스
    private EditText mEtEmail, mEtPwd;
    //private EditText mEtNickname;         // 회원가입 입력 필드
    private Button mBtnRegister;                            // 회원가입 버튼

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        mFirebaseAuth = FirebaseAuth.getInstance();
        mDatabaseRef = FirebaseDatabase.getInstance().getReference("fish_identification");
       // mEtNickname = findViewById(R.id.et_nickname);
        mEtEmail = findViewById(R.id.et_email);
        mEtPwd = findViewById(R.id.et_pwd);
        mBtnRegister = findViewById(R.id.btn_register);

        mBtnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //회원가입 처리 시작

                String strEmail = mEtEmail.getText().toString(); // 입력값을 문자열로 변환시켜서 저장.
                String strPwd = mEtPwd.getText().toString();
                //String strNickName = mEtNickname.getText().toString();

                // firebase auth 진행
                mFirebaseAuth.createUserWithEmailAndPassword(strEmail, strPwd).addOnCompleteListener(RegisterActivity.this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) { //결과값을 task로 받아옴

                        if(task.isSuccessful()){
                            FirebaseUser firebaseUser = mFirebaseAuth.getCurrentUser(); //현재 유저로 받아옴.
                            UserAccount account = new UserAccount();
                            account.setEmailId(firebaseUser.getEmail());
                            account.setIdToken(firebaseUser.getUid());
                            //account.setNickName(strNickName);
                            account.setPassword(strPwd);

                            //닉네임 추가 필요
                            // setValue : database 에 insert
                            mDatabaseRef.child("UserAccount").child(firebaseUser.getUid()).setValue(account);
                            Toast.makeText(RegisterActivity.this,"회원가입에 성공하셨습니다.",Toast.LENGTH_SHORT).show();
                        }else{
                            Toast.makeText(RegisterActivity.this,"회원가입에 실패하셨습니다.",Toast.LENGTH_SHORT).show();;
                        }
                    }
                });
            }
        });

    }
}