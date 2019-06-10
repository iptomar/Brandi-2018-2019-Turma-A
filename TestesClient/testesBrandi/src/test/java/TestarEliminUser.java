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
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author Pedro Tapadas
 */
public class TestarEliminUser {
    static WebDriver driver = new ChromeDriver();
    //variavel utilizada para fazer o logout no final do teste
    boolean dologout = true;
    
    public TestarEliminUser() {
        
    }
    
    @BeforeClass
    public static void setUpClass() throws InterruptedException {
        //definir pagina inicial
        driver.get("brandi.ipt.pt:81");
        //preencher campos de login
        WebElement userField = driver.findElement(By.id("user"));
        userField.sendKeys("admin"); 
        WebElement passField = driver.findElement(By.id("pass"));
        passField.sendKeys("admin");
        //eperar para deixar mostrar o input de dados
        Thread.sleep(2000);
        //submeter o login
        passField.submit();
        Thread.sleep(2000);
        //Selecionar a opção "utilizadores"
        List<WebElement> users =  driver.findElements(By.className("nav-link"));
        users.get(2).click();
        Thread.sleep(2000);
        //selecionar o dropdown-item "listar" que se encontra depois de selecionar a opção "utilizadores"
        List<WebElement> options =  driver.findElements(By.className("dropdown-item"));
        //selecionar a opção 4 pois apesar de nao estarem visiveis, a lista "options" irá ter todos (6) os dropdown-items 
        options.get(4).click();
        Thread.sleep(2000);
    }
    
    @AfterClass
    public static void tearDownClass() {
        driver.quit();
    }
    
    @Before
    public void setUp(){
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
    public void TesteEliminUser() throws InterruptedException {
        //dentro da pagina que apresenta os users registados seleciona-se todos os butoes 
        // e colocam-se todos numa lista
        List<WebElement> del =  driver.findElements(By.className("btn-danger"));
        // seleciona-se o ultimo elemento da lista
        del.get(del.size()-1).click();
        //seleciona-se o butao que confirma a eliminacao do user
        WebElement confirm = driver.findElement(By.id("deleteUserConfirm"));
        Thread.sleep(2000);
        confirm.click();
        Thread.sleep(2000);
        // condicao que verifica se a mensagem de eliminacao bem sucedida foi apresentada
        WebElement msg = driver.findElement(By.id("adeus"));
        assertEquals(true, msg.getText().contains("Utilizador eliminado com sucesso"));
        //variavel dologout mudada para true para que seja efetuado o logout no after
        dologout = true;
    }
        
}
