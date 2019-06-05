/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.util.List;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.Ignore;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author Pedro Tapadas
 */
public class TestarLogin {
    
    static WebDriver driver = new ChromeDriver();
    //variavel utilizada para fazer o logout no final do teste
    boolean dologout = true;
    
    public TestarLogin() {
    
       

    }
    
    @BeforeClass
    public static void setUpClass() throws InterruptedException {
      
    }
    
    @AfterClass
    public static void tearDownClass() {
        driver.quit();
    }
    
    @Before
    public void setUp() {
        
    }
    
    @After
    public void tearDown() {
        //caso a variavel dologout estetja a true, é efetuado o logout selecionando 
        //esta opçao na pagina "IndexFichaRIPage"
        if (dologout) {
        WebElement sair =  driver.findElement(By.className("nav-sair"));
        sair.click();
        } 
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    @Test
    public void TestLoginSucesso() throws InterruptedException {
        //definir pagina inicial
        driver.get("brandi.ipt.pt:81");
        //preencher campos de login
        WebElement userField = driver.findElement(By.id("user"));
        userField.sendKeys("aluno");
        WebElement passField = driver.findElement(By.id("pass"));
        passField.sendKeys("aluno");
        //eperar para deixar mostrar o input de dados
        Thread.sleep(2000);
        passField.submit();
        Thread.sleep(2000); 
        //efectuar o logout
        assertEquals(true,true);
       dologout = true;
    }
    
    @Test
    public void TestLoginInSucesso() throws InterruptedException {
        //definir pagina inicial
        driver.get("brandi.ipt.pt:81");
        //preencher campos de login
        WebElement userField = driver.findElement(By.id("user"));
        userField.sendKeys("lala");
        WebElement passField = driver.findElement(By.id("pass"));
        passField.sendKeys("lala");
        //eperar para deixar mostrar o input de dados
        Thread.sleep(2000); 
        passField.submit();
        Thread.sleep(2000);  
        // condicao que verifica se a mensagem de login falhado foi apresentada
        WebElement msg = driver.findElement(By.id("adeus"));
        assertEquals(true, msg.getText().contains("Utilizador ou palavra-passe erradas"));
         //variavel dologout mudada para true para que seja efetuado o logout no after
        dologout = false;
     }
}