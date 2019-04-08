/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package testes;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author Pedro Tapadas
 */
public class teste {
    public static void main(String[] args) throws InterruptedException {
          WebDriver driver = new ChromeDriver();
        driver.get("brandi.ipt.pt:81");

        WebElement userField = driver.findElement(By.id("user"));
        userField.sendKeys("admin");
        Thread.sleep(2000);  // Let the user actually see something!
        WebElement passField = driver.findElement(By.id("pass"));
        passField.sendKeys("admin");
        passField.submit();
        Thread.sleep(2000);  // Let the user actually see something!
        WebElement ficha = driver.findElement(By.className("card"));
        ficha.click();
        Thread.sleep(2000);
        
        WebElement details = driver.findElement(By.className("DetailsRIPage"));
        if(details.isDisplayed()){
            System.out.println("Teste de visualização de detalhes com sucesso");
        }else{
            System.out.println("Teste de visualização de detalhes com insucesso");
        }
        
    }
}
