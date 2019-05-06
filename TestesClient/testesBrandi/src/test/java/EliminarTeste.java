/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Tests;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author BatPC
 */
public class EliminarTeste {
    
     static WebDriver driver;
    
    public EliminarTeste() {
    }
    
    @BeforeClass
    public static void setUpClass() throws InterruptedException {
        driver = new ChromeDriver();
        driver.get("brandi.ipt.pt:81");

        WebElement userField = driver.findElement(By.id("user"));
        userField.sendKeys("admin");
        Thread.sleep(2000);  // Let the user actually see something!
        WebElement passField = driver.findElement(By.id("pass"));
        passField.sendKeys("admin");
        passField.submit();
        Thread.sleep(2000);
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
        driver.get("brandi.ipt.pt:81/DetailsRIPage");
    }
    
    @After
    public void tearDown() {
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    @Test
    public void EliminarTeste() throws InterruptedException {
    WebElement index = driver.findElement(By.className("IndexFichaRIPage"));
        if(index.isDisplayed()){
            System.out.println("Login Com Sucesso");
        }else{
            System.out.println("Login Invalido");
        }
        
        WebElement selectImage = driver.findElement(By.className("card"));
        selectImage.click();
        Thread.sleep(3000);
        
        WebElement itemPage = driver.findElement(By.className("DetailsRIPage"));
        if(itemPage.isDisplayed()){
            System.out.println("Item Selecionado com Sucesso");
        }else{
            System.out.println("Item Não Selecionado");
        }
        
        WebElement deleteButton = driver.findElement(By.className("btn-danger"));
        deleteButton.click();
        Thread.sleep(3000);
        
        WebElement deletePopup = driver.findElement(By.className("modal-dialog"));
        if(deletePopup.isDisplayed()){
            System.out.println("Popup de confirmação bem sucedido");
        }else{
            System.out.println("Não apareceu o popup");
        }
        
        WebElement confirmDeleteButton = driver.findElement(By.className("modal-footer")).findElement(By.className("btn-primary"));
        confirmDeleteButton.click();
        Thread.sleep(3000);
        
        if(itemPage.isDisplayed()){
            System.out.println("Item Eliminado com sucesso");
        }else{
            System.out.println("Item Não Eliminado");
        }
        
    }
}
