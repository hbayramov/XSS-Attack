import java.lang.*;
import java.io.*;
import java.net.*;
import java.util.LinkedList;
import java.util.List;

public class TCP {

    public static void main(String argv[]) throws IOException {


       ServerSocket server = new ServerSocket(6001);

        while (true) {

         Socket newsocket = server.accept();
         System.out.println("Connected!\n");
         BufferedReader br = new BufferedReader(new InputStreamReader(newsocket.getInputStream()));
         FileWriter wr = new FileWriter("cookies.txt",true);

          String line;
          List<String> headers = new LinkedList<String>(); // add header message to headers list
          StringBuilder body = null;

          while ((line = br.readLine()) != null) {

            if (line.isEmpty() && body == null) { // if line is empty then we reach a body part of message
                body = new StringBuilder();
                continue;
            }
            if (body != null) {
                body.append(line).append('\n');
            }
            else {
                headers.add(line);
            }
        }

        wr.write(body != null ? body.toString() + "\n" : "" + "\n");
        wr.close();
       }

    }
}
