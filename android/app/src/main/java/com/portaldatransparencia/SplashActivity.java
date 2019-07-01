package com.portaldatransparencia;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ProgressBar;
import android.widget.TextView;
import java.util.Timer;
import java.util.TimerTask;

public class SplashActivity extends AppCompatActivity {
  private Timer timer;
  private ProgressBar progressBar;
  private int i = 0;
  TextView textView;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_splash);
    progressBar = (ProgressBar) findViewById(R.id.progressBar);
    progressBar.setProgress(0);
    textView = (TextView) findViewById(R.id.textView);
    textView.setText("");

    final long period = 100;
    timer = new Timer();
    timer.schedule(new TimerTask() {
      @Override
      public void run() {
        // this repeats every 100 ms
        if (i < 100) {
          runOnUiThread(new Runnable() {
            @Override
            public void run() {
              textView.setText("Informações de forma simples e rápida com apenas alguns clicks");
            }
          });
          progressBar.setProgress(i);
          i++;
        } else {
          // closing the timer
          timer.cancel();
          Intent intent = new Intent(SplashActivity.this, MainActivity.class);
          startActivity(intent);
          // close this activity
          finish();
        }
      }
    }, 0, period);
  }

}
